import { departments } from '@/data/departments';
import { Avatar, Button, Typography } from '@material-tailwind/react';
import React from 'react'

export default function AdministratorItem({ administrator, className, onEdit, onDelete }) {
  const defaultAdministratorImage = 'https://tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png';  

  return (
    <>
      <tr key={administrator.id}>
        <td className={className}>
          <div className="flex items-center gap-4">
            <Avatar
              src={administrator.image ? administrator.image : defaultAdministratorImage}
              alt={administrator.name}
              size="sm"
              variant="rounded"
            />
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-semibold"
              >
                {administrator.name}
              </Typography>
            </div>
          </div>
        </td>
        <td className={className}>
          <Typography className="text-xs font-semibold text-blue-gray-600">
            {departments[administrator.department] ? departments[administrator.department].name : ''}
          </Typography>
        </td>
        <td className={className}>
          <Typography className="text-xs font-semibold text-blue-gray-600">
            {administrator.email}
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
