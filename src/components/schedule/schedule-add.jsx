import useSchedule from '@/hooks/use-schedule';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Option, Select, Typography } from '@material-tailwind/react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import { departments } from '@/data/departments';
import DateTimePicker from 'react-datetime-picker';
import DatePicker from '../datepicker';
import { useAuth } from '@/context/auth-context';

// times in 30 minutes interval
const times = [
  "00:00", "00:30",
  "01:00", "01:30",
  "02:00", "02:30",
  "03:00", "03:30",
  "04:00", "04:30",
  "05:00", "05:30",
  "06:00", "06:30",
  "07:00", "07:30",
  "08:00", "08:30",
  "09:00", "09:30",
  "10:00", "10:30",
  "11:00", "11:30",
  "12:00", "12:30",
  "13:00", "13:30",
  "14:00", "14:30",
  "15:00", "15:30",
  "16:00", "16:30",
  "17:00", "17:30",
  "18:00", "18:30",
  "19:00", "19:30",
  "20:00", "20:30",
  "21:00", "21:30",
  "22:00", "22:30",
  "23:00", "23:30",
];

export default function ScheduleAdd ({ open, toggle, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const { addSchedule } = useSchedule();

  const { user } = useAuth();

  const fields = [
    {
      name: "label",
      label: "Label",
      placeholder: "Label",
      type: "text",
    },
    {
      name: "description",
      label: "Description",
      placeholder: "Description",
      type: "text",
    },
    {
      name: "from",
      label: "From",
      placeholder: "From",
      type: "datetime",
    },
    {
      name: "from-time",
      label: "From Time",
      placeholder: "From Time",
      type: "select",
      options: times.map((time) => ({
        label: time,
        value: time,
      }))
    },
    {
      name: "to",
      label: "To",
      placeholder: "Name",
      type: "datetime",
    },
    {
      name: "to-time",
      label: "To Time",
      placeholder: "To Time",
      type: "select",
      options: times.map((time) => ({
        label: time,
        value: time,
      }))
    },
    {
      name: "department",
      label: "Department",
      placeholder: "Department",
      type: "select",
      options: departments.map((department) => ({
        label: department.name,
        value: department.id,
      })),
      readonly: typeof user.department == 'string',
    },
  ];

  const validationSchema = Yup.object().shape({
    label: Yup.string().required('Label is required'),
    description: Yup.string().required('Description is required'),
    from: Yup.date().required('From is required'),
    'from-time': Yup.string().required('From Time is required'), // 'from-time' is a hack to make formik work with 'from-time' and 'to-time
    to: Yup.date().required('To is required'),
    'to-time': Yup.string().required('To Time is required'), // 'to-time' is a hack to make formik work with 'from-time' and 'to-time
    department: Yup.string().required('Department is required'),
  });
  
  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      await addSchedule(values);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <Dialog size="sm" open={open} handler={toggle}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          label: '',
          description: '',
          from: new Date(),
          'from-time': '00:00',
          to: new Date(),
          'to-time': '00:00',
          department: user.department,
        }}
        onSubmit={handleSubmit}
      >
        {(props) => {
          return (
            <form onSubmit={props.handleSubmit} className="mx-auto flex flex-col gap-4">
              <DialogHeader>Add Schedule</DialogHeader>
              
              <DialogBody>
                <div className="mb-1 flex flex-col gap-2">   
                  {fields.map((field) => {
                    if (field.type === 'text') {
                      return (
                        <div className="flex flex-col gap-2" key={field.label}>
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            {field.label}
                          </Typography>
                          <Input
                            size="lg"
                            name={field.name}
                            placeholder={field.placeholder}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                              className: "before:content-none after:content-none",
                            }}
                            onBlur={props.handleBlur}
                            value={props.values[field.name]}
                            error={props.touched[field.name] && props.errors[field.name] !== undefined}
                            onChange={props.handleChange}
                          />
                          <div>
                            <Typography variant="paragraph" color="red" className="text-sm font-medium">
                              {props.errors[field.name] && props.touched[field.name] ? props.errors[field.name] : ""}
                            </Typography>
                          </div>
                        </div>
                      )
                    } else if (field.type === 'select') {
                      return (
                        <div className="flex flex-col gap-2" key={field.label}>
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            {field.label}
                          </Typography>
                          <Select
                            size="lg"
                            name={field.name}
                            placeholder={field.placeholder}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                              className: "before:content-none after:content-none",
                            }}
                            onBlur={props.handleBlur}
                            value={props.values[field.name]}
                            error={props.touched[field.name] && props.errors[field.name] !== undefined}
                            onChange={(value) => props.setFieldValue(field.name, value)}
                            disabled={field.readonly}
                          >
                            {field.options.map((option) => (
                              <Option value={option.value} key={option.value}>
                                {option.label}
                              </Option>
                            ))}
                          </Select>
                          <div>
                            <Typography variant="paragraph" color="red" className="text-sm font-medium">
                              {props.errors[field.name] && props.touched[field.name] ? props.errors[field.name] : ""}
                            </Typography>
                          </div>
                        </div>
                      )
                    } else if (field.type === 'datetime') {
                      return (
                        <div className="flex flex-col gap-2" key={field.label}>
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            {field.label}
                          </Typography>
                          <DatePicker props={props} field={field} key={field.name} />
                          <div>
                            <Typography variant="paragraph" color="red" className="text-sm font-medium">
                              {props.errors[field.name] && props.touched[field.name] ? props.errors[field.name] : ""}
                            </Typography>
                          </div>
                        </div>
                      )
                    }

                    return <></>;
                  })}
                </div>
              </DialogBody>
              <DialogFooter>
                <Button
                  onClick={toggle}
                  variant="text"
                  color="gray"
                  className="mr-1"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  color="light-blue"
                  size="lg"
                  disabled={isLoading}
                >
                  Add Schedule
                </Button>
              </DialogFooter>
            </form>
          )
        }}
      </Formik>
    </Dialog>
  )
}
