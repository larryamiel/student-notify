import { CalendarDaysIcon } from '@heroicons/react/24/solid'
import { Button, Typography } from '@material-tailwind/react'
import { format } from 'date-fns'
import React from 'react'

export default function ScheduleItem({ schedule, onEdit, onSend, onDelete }) {
  return (
    <div className='rounded-md p-8 shadow-lg border-2'>
      <div className='flex flex-row items-center gap-x-4 justify-start'>
        <div className="flex flex-col gap-x-4 gap-y-2 min-w-[200px]">
          <Typography className="text-xs uppercase font-semibold text-blue-gray-600">
            {schedule.from && format(schedule.from.toDate(), 'MMMM dd, yyyy - hh:mm a')}
          </Typography>
          
          <Typography className="text-xs uppercase font-semibold text-blue-gray-600">
            {schedule.to && format(schedule.to.toDate(), 'MMMM dd, yyyy - hh:mm a')}
          </Typography>
        </div>

        <div>
          <Typography className='text-xl font-semibold mb-2'>
            {schedule.label}
          </Typography>

          <Typography className='text-sm text-gray-700 mb-4'>
            {schedule.description}
          </Typography>

          <div className='flex flex-row flex-justify-end gap-2 '>
            <Button
              onClick={() => onEdit()}
              color='light-blue'
              size='sm'
            >
              Edit
            </Button>

            <Button
              onClick={() => onSend()}
              color='green'
              size='sm'
            >
              Send
            </Button>

            <Button
              onClick={() => onDelete()}
              color='red'
              size='sm'
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
