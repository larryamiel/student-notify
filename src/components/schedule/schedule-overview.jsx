import { useAuth } from '@/context/auth-context';
import { ordersOverviewData } from '@/data'
import useSchedule from '@/hooks/use-schedule';
import { CalendarDaysIcon } from '@heroicons/react/24/solid'
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'

export default function ScheduleOverview() {
  const [events, setEvents] = useState([]);

  const { getSchedules } = useSchedule();
  const { user } = useAuth();

  useEffect(() => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const initialize = async () => {
      const events = await getSchedules(user.department, month, year);
      setEvents(events);
    };

    initialize();
  }, [])

  return (
    <Card className="border border-blue-gray-100 shadow-sm">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 p-6"
      >
        <Typography variant="h4" color="blue-gray" className="mb-2">
          Monthly Schedule
        </Typography>
        <Typography
          variant="small"
          className="flex items-center gap-1 font-normal text-blue-gray-600"
        >
          <CalendarDaysIcon className="!w-5 !h-5" />
          <strong>{events ? events.length : 0}</strong> scheduled events this month
        </Typography>
      </CardHeader>
      <CardBody className="pt-0">
        {events.map(
          ({ from, to, label, description }, key) => (
            <div className='mb-4 border-t-2 pt-2' key={key}>
              <div className='flex flex-col items-start gap-x-4 justify-center'>
                <Typography className="text-xs uppercase font-semibold text-blue-gray-600 mb-2">
                  {from && format(from.toDate(), 'MMMM dd, yyyy - hh:mm a')} - {to && format(to.toDate(), 'MMMM dd, yyyy - hh:mm a')}
                </Typography>

                <Typography className='text-xl font-semibold mb-2'>
                  {label}
                </Typography>

                <Typography className='text-sm text-gray-700'>
                  {description}
                </Typography>
              </div>
            </div>
          )
        )}
      </CardBody>
    </Card>
  )
}
