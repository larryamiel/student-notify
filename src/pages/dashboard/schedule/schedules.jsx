import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import useSchedule from "@/hooks/use-schedule";
import ScheduleItem from "@/components/schedule/schedule-item";
import ScheduleAdd from "@/components/schedule/schedule-add";
import ScheduleEdit from "@/components/schedule/schedule-edit";
import ScheduleDelete from "@/components/schedule/schedule-delete";
import { sendScheduleMessage } from "@/firebase/firebase";

const months = [
  {
    label: "January",
    value: 1,
  },
  {
    label: "February",
    value: 2,
  },
  {
    label: "March",
    value: 3,
  },
  {
    label: "April",
    value: 4,
  },
  {
    label: "May",
    value: 5,
  },
  {
    label: "June",
    value: 6,
  },
  {
    label: "July",
    value: 7,
  },
  {
    label: "August",
    value: 8,
  },
  {
    label: "September",
    value: 9,
  },
  {
    label: "October",
    value: 10,
  },
  {
    label: "November",
    value: 11,
  },
  {
    label: "December",
    value: 12,
  }
];

const years = [
  {
    label: "2023",
    value: 2023,
  },
  {
    label: "2024",
    value: 2024,
  },
  {
    label: "2025",
    value: 2025,
  },
  {
    label: "2026",
    value: 2026,
  },
  {
    label: "2027",
    value: 2027,
  },
  {
    label: "2028",
    value: 2028,
  },
  {
    label: "2029",
    value: 2029,
  },
  {
    label: "2030",
    value: 2030,
  }
];

export function Schedules() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [schedules, setSchedules] = useState([]);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const { user } = useAuth();
  const { getSchedules, updateSchedule, deleteSchedule } = useSchedule();
  
  const refetchSchedules = async () => {
    setIsLoading(true);
    const schedules = await getSchedules(user.department, month, year);
    if (schedules) setSchedules(schedules);
    setIsLoading(false);
  }

  const handleScheduleEdit = async (values) => {
    try {
      await updateSchedule(selectedSchedule.id, values);
      refetchSchedules();
      setOpenEdit(false);
    } catch (err) {
      console.log(err);
    }
  }

  const handleScheduleDelete = async () => {
    try {
      await deleteSchedule(selectedSchedule.id);
      refetchSchedules();
      setOpenDelete(false);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSendMessage = async (schedule) => {
    try {
      const result = await sendScheduleMessage({ schedule_id: schedule.id });

      if (result) {
        alert("Message sent successfully");
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchSchedules = async () => {
      setIsLoading(true);
      const schedules = await getSchedules(user.department, month, year);
      if (schedules) setSchedules(schedules);
      setIsLoading(false);
    };

    fetchSchedules();
  }, [user, month, year]);

  const renderSchedules = () => {
    if (isLoading) {
      return (
        <Typography className="font-bold text-center">
          Loading...
        </Typography>
      );
    }

    if (!schedules || schedules.length === 0) {
      return (
        <Typography className="font-bold text-center">
          No scheduled events found
        </Typography>
      );
    }

    return schedules.map((schedule, index) => {
      const className = `py-3 px-5 ${
        index === schedules.length - 1 ? "" : "border-b border-blue-gray-50"
      }`;

      return (
        <ScheduleItem
          key={schedule.id}
          schedule={schedule}
          className={className}
          onEdit={() => {
            setSelectedSchedule(schedule);
            setOpenEdit(true);
          }}
          onSend={() => {
            handleSendMessage(schedule);
          }}
          onDelete={() => {
            setSelectedSchedule(schedule);
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
              Scheduled Events
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
        <CardBody className="px-0 pt-0 pb-2 w-full">
          <div className="flex flex-row justify-center items-center gap-4 w-full">
            <div className="max-w-[200px]">
              <Select
                size="md"
                name="month"
                placeholder="Month"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={month.toString()}
                onChange={(value) => setMonth(value)}
              >
                {months.map((month) => (
                  <Option value={month.value.toString()} key={month.value}>
                    {month.label}
                  </Option>
                ))}
              </Select>
            </div>
            
            <div className="max-w-[200px]">
              <Select
                size="md"
                name="year"
                placeholder="Year"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={year.toString()}
                onChange={(value) => setYear(value)}
              >
                {years.map((year) => (
                  <Option value={year.value.toString()} key={year.value}>
                    {year.label}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4 p-4">
            {renderSchedules()}
          </div>
        </CardBody>
      </Card>

      <ScheduleEdit
        schedule={selectedSchedule}
        open={openEdit}
        setOpen={setOpenEdit}
        toggle={() => setOpenEdit((open) => !open)}
        onSuccess={handleScheduleEdit}
      />

      <ScheduleDelete
        open={openDelete}
        onConfirm={handleScheduleDelete}
        onCancel={() => setOpenDelete(false)}
        toggle={() => setOpenDelete((open) => !open)}
      />

      <ScheduleAdd
        open={openAdd}
        toggle={() => setOpenAdd((open) => !open)}
        onSuccess={() => {
          refetchSchedules();
          setOpenAdd(false);
        }}
      />
    </div>
  );
}

export default Schedules;
