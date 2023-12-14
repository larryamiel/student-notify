import useStudent from '@/hooks/use-student';
import { Avatar, Typography } from '@material-tailwind/react';
import React from 'react'

export default function StudentItem({ student, index }) {
  const { deleteStudent } = useStudent();

  const className = `py-3 px-5 ${
    index === students.length - 1 ? "" : "border-b border-blue-gray-50"
  }`;

  const defaultStudentImage = 'https://tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png';  

  return (
    <tr key={student.id}>
      <td className={className}>
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {student.id}
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
          {student.department}
        </Typography>
      </td>
      <td className={className}>
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {student.year}
        </Typography>
      </td>
      <td className={className}>
        <Typography
          as="a"
          href="#"
          className="text-xs font-semibold text-blue-gray-600"
        >
          Edit
        </Typography>

        <Typography
          as="button"
          onClick={() => deleteStudent(student.id)}
          className="text-xs font-semibold text-blue-gray-600"
        >
          Delete
        </Typography>
      </td>
    </tr>
  );
}
