import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import useAdministrator from "@/hooks/use-administrator";
import AdministratorItem from "@/components/administrator/administrator-item";
import AdministratorAdd from "@/components/administrator/administrator-add";
import AdministratorEdit from "@/components/administrator/administrator-edit";
import AdministratorDelete from "@/components/administrator/administrator-delete";


export function Administrators() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedAdministrator, setSelectedAdministrator] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [administrators, setAdministrators] = useState([]);
  const [search, setSearch] = useState('');

  const { user } = useAuth();
  const { getAdministrators, updateAdministrator, deleteAdministrator } = useAdministrator();
  
  const refetchAdministrators = async () => {
    setIsLoading(true);
    const administrators = await getAdministrators(user.department, search);
    if (administrators) setAdministrators(administrators);
    setIsLoading(false);
  }

  const handleAdministratorEdit = async (values) => {
    try {
      await updateAdministrator(selectedAdministrator.id, values);
      refetchAdministrators();
      setOpenEdit(false);
    } catch (err) {
      console.log(err);
    }
  }

  const handleAdministratorDelete = async () => {
    try {
      await deleteAdministrator(selectedAdministrator.id);
      refetchAdministrators();
      setOpenDelete(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchAdministrators = async () => {
      setIsLoading(true);
      const administrators = await getAdministrators(user.department, search);
      if (administrators) setAdministrators(administrators);
      setIsLoading(false);
    };

    fetchAdministrators();
  }, [user, search]);

  const renderAdministrators = () => {
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

    if (!administrators || administrators.length === 0) {
      return (
        <tr>
          <td colSpan={5} className="text-center py-5">
            <Typography className="font-bold">
              No administrators found
            </Typography>
          </td>
        </tr>
      );
    }

    return administrators.map((administrator, index) => {
      const className = `py-3 px-5 ${
        index === administrators.length - 1 ? "" : "border-b border-blue-gray-50"
      }`;

      return (
        <AdministratorItem
          key={administrator.id}
          administrator={administrator}
          className={className}
          onEdit={() => {
            setSelectedAdministrator(administrator);
            setOpenEdit(true);
          }}
          onDelete={() => {
            setSelectedAdministrator(administrator);
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
              Administrators Table
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
                {["name", "department", "email", ""].map((el) => (
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
              {renderAdministrators()}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <AdministratorEdit
        administrator={selectedAdministrator}
        open={openEdit}
        setOpen={setOpenEdit}
        toggle={() => setOpenEdit((open) => !open)}
        onSuccess={handleAdministratorEdit}
      />

      <AdministratorDelete
        open={openDelete}
        onConfirm={handleAdministratorDelete}
        onCancel={() => setOpenDelete(false)}
        toggle={() => setOpenDelete((open) => !open)}
      />

      <AdministratorAdd
        open={openAdd}
        toggle={() => setOpenAdd((open) => !open)}
        onSuccess={() => {
          refetchAdministrators();
          setOpenAdd(false);
        }}
      />
    </div>
  );
}

export default Administrators;
