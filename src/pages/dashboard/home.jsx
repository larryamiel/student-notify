import React, { useEffect, useState } from "react";
import {
  Typography,
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { ClockIcon, UsersIcon } from "@heroicons/react/24/solid";
import ScheduleOverview from "@/components/schedule/schedule-overview";
import useSchedule from "@/hooks/use-schedule";
import useStudent from "@/hooks/use-student";
import { useAuth } from "@/context/auth-context";

export function Home() {
  const [eventsCount, setEventsCount] = useState(0); // [1
  const [studentCount, setStudentCount] = useState(0);

  const { getUpcomingSchedulesCount } = useSchedule();
  const { getStudentCount } = useStudent();

  const { user } = useAuth();

  useEffect(() => {
    const initialize = async () => {
      const eventsCount = await getUpcomingSchedulesCount(user.department);
      const studentCount = await getStudentCount(user.department);

      setEventsCount(eventsCount);
      setStudentCount(studentCount);
    };

    initialize();
  }, []);

  const data = [
    {
      color: "gray",
      icon: ClockIcon,
      title: "Upcoming Events",
      value: eventsCount
    },
    {
      color: "gray",
      icon: UsersIcon,
      title: "Total Students",
      value: studentCount,
    }
  ]

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
        {data.map(({ icon, title, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
          />
        ))}
      </div>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ScheduleOverview />
      </div>
    </div>
  );
}

export default Home;
