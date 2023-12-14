import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { useEffect, useState } from "react";
import useStudent from "@/hooks/use-student";
import StudentItem from "@/components/student/student-item";
import StudentAdd from "@/components/student/student-add";

export function Students() {
  const [openAdd, setOpenAdd] = useState(false);
  const [students, setStudents] = useState([]);
  const [page , setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState(null);

  const { getStudents } = useStudent();
  
  const refetchStudents = async () => {
    const students = await getStudents(department, page, search);
    if (students) setStudents(students);
  }

  useEffect(() => {
    const fetchStudents = async () => {
      const students = await getStudents(department, page, search);
      console.log('students', students);
      if (students) setStudents(students);
    };

    fetchStudents();
  }, [department, page, search]);

  const renderStudents = () => {
    if (!students || students.length === 0) {
      return (
        <tr>
          <td colSpan={5} className="text-center py-5">
            <Typography variant="h6" color="blue-gray">
              No students found
            </Typography>
          </td>
        </tr>
      );
    }

    return students.map((student, index) => {
      <StudentItem
        student={student}
        index={index}
      />
    });
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <div className="flex flex-row justify-between items-center gap-4">
            <Typography variant="h6" color="white">
              Students Table
            </Typography>

            <Button
              color="light-blue"
              size="md"
              onClick={() => setOpenAdd(true)}
            >
              Add New
            </Button>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["student id", "name", "department", "year", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {renderStudents()}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <StudentAdd
        open={openAdd}
        toggle={() => setOpenAdd((open) => !open)}
        onSuccess={refetchStudents}
      />
    </div>
  );
}

export default Students;
