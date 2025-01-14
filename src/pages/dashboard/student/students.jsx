import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import useStudent from "@/hooks/use-student";
import StudentItem from "@/components/student/student-item";
import StudentAdd from "@/components/student/student-add";
import StudentEdit from "@/components/student/student-edit";
import StudentDelete from "@/components/student/student-delete";


export function Students() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  const { user } = useAuth();
  const { getStudents, updateStudent, deleteStudent } = useStudent();
  
  const refetchStudents = async () => {
    setIsLoading(true);
    const students = await getStudents(user.department, search);
    if (students) setStudents(students);
    setIsLoading(false);
  }

  const handleStudentEdit = async (values) => {
    try {
      await updateStudent(selectedStudent.id, values);
      refetchStudents();
      setOpenEdit(false);
    } catch (err) {
      console.log(err);
    }
  }

  const handleStudentDelete = async () => {
    try {
      await deleteStudent(selectedStudent.id);
      refetchStudents();
      setOpenDelete(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      const students = await getStudents(user.department, search);
      if (students) setStudents(students);
      setIsLoading(false);
    };

    fetchStudents();
  }, [user, search]);

  const renderStudents = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan={5} className="text-center py-5">
            <Typography className="font-bold">
              Loading...
            </Typography>
          </td>
        </tr>
      );
    }

    if (!students || students.length === 0) {
      return (
        <tr>
          <td colSpan={5} className="text-center py-5">
            <Typography className="font-bold">
              No students found
            </Typography>
          </td>
        </tr>
      );
    }

    return students.map((student, index) => {
      const className = `py-3 px-5 ${
        index === students.length - 1 ? "" : "border-b border-blue-gray-50"
      }`;

      return (
        <StudentItem
          key={student.id}
          student={student}
          className={className}
          onEdit={() => {
            setSelectedStudent(student);
            setOpenEdit(true);
          }}
          onDelete={() => {
            setSelectedStudent(student);
            setOpenDelete(true);
          }}
        />
      );
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

      <StudentEdit
        student={selectedStudent}
        open={openEdit}
        setOpen={setOpenEdit}
        toggle={() => setOpenEdit((open) => !open)}
        onSuccess={handleStudentEdit}
      />

      <StudentDelete
        open={openDelete}
        onConfirm={handleStudentDelete}
        onCancel={() => setOpenDelete(false)}
        toggle={() => setOpenDelete((open) => !open)}
      />

      <StudentAdd
        open={openAdd}
        toggle={() => setOpenAdd((open) => !open)}
        onSuccess={() => {
          refetchStudents();
          setOpenAdd(false);
        }}
      />
    </div>
  );
}

export default Students;
