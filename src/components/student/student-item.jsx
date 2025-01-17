import { departments } from '@/data/departments';
import useStudent from '@/hooks/use-student';
import { Avatar, Button, Typography } from '@material-tailwind/react';
import React, { useState } from 'react'

export default function StudentItem({ student, className, onEdit, onDelete }) {
  const defaultStudentImage = 'https://tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png';  

  return (
    <>
      <tr key={student.id}>
        <td className={className}>
          <Typography className="text-xs font-semibold text-blue-gray-600">
            {student.student_id}
          </Typography>
        </td>
        <td className={className}>
          <div className="flex items-center gap-4">
            <Avatar
              src={student.image ? student.image : defaultStudentImage}
              alt={student.name}
              size="sm"
              variant="rounded"
            />
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-semibold"
              >
                {student.name}
              </Typography>
            </div>
          </div>
        </td>
        <td className={className}>
          <Typography className="text-xs font-semibold text-blue-gray-600">
            {departments[student.department] ? departments[student.department].name : ''}
          </Typography>
        </td>
        <td className={className}>
          <Typography className="text-xs font-semibold text-blue-gray-600">
            {student.year}
          </Typography>
        </td>
        <td className={className}>
          <div className='flex flex-row flex-justify-end gap-2 '>
            <Button
              onClick={() => onEdit()}
              color='light-blue'
              size='sm'
            >
              Edit
            </Button>

            <Button
              onClick={() => onDelete()}
              color='red'
              size='sm'
            >
              Delete
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
}
