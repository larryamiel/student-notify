import useStudent from '@/hooks/use-student';
import { Button, Dialog, DialogBody, DialogHeader, Input, Option, Popover, PopoverContent, PopoverHandler, Select, Typography } from '@material-tailwind/react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import { DayPicker } from 'react-day-picker';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';

export default function StudentAdd ({ open, toggle, onSuccess }) {
  const [date, setDate] = useState(null);
  const { addStudent } = useStudent();

  const fields = [
    {
      name: "student_id",
      label: "Student ID",
      placeholder: "Student ID",
      type: "text",
    },
    {
      name: "name",
      label: "Name",
      placeholder: "Name",
      type: "text",
    },
    {
      name: "department",
      label: "Department",
      placeholder: "Department",
      type: "select",
      options: [
        {
          label: "Computer Science",
          value: "Computer Science",
        },
        {
          label: "Information Technology",
          value: "Information Technology",
        },
        {
          label: "Electronics and Communication",
          value: "Electronics and Communication",
        },
        {
          label: "Electrical and Electronics",
          value: "Electrical and Electronics",
        },
        {
          label: "Mechanical",
          value: "Mechanical",
        },
        {
          label: "Civil",
          value: "Civil",
        },
        {
          label: "Chemical",
          value: "Chemical",
        },
        {
          label: "Bio Technology",
          value: "Bio Technology",
        },
        {
          label: "Bio Medical",
          value: "Bio Medical",
        },
        {
          label: "Aeronautical",
          value: "Aeronautical",
        },
        {
          label: "Agriculture",
          value: "Agriculture",
        },
        {
          label: "Other",
          value: "Other",
        },
      ]
    },
    {
      name: "year",
      label: "Year",
      placeholder: "Year",
      type: "select",
      options: [
        {
          label: "First",
          value: "First",
        },
        {
          label: "Second",
          value: "Second",
        },
        {
          label: "Third",
          value: "Third",
        },
        {
          label: "Fourth",
          value: "Fourth",
        },
        {
          label: "Fifth",
          value: "Fifth",
        },
        {
          label: "Other",
          value: "Other",
        }
      ]
    },
  ];

  const validationSchema = Yup.object().shape({
    student_id: Yup.string().required().min(6),
    name: Yup.string().required(),
    department: Yup.string().required(),
    year: Yup.string().required(),
  });
  
  const handleSubmit = (values) => {
    try {
      addStudent(values);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog size="sm" open={open} handler={toggle}>
      <DialogHeader>Add Student</DialogHeader>
      
      <DialogBody>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            student_id: '',
            name: '',
            department: '',
            year: '',
          }}
          onSubmit={handleSubmit}
        >
          {(props) => {
            return (
              <form onSubmit={props.handleSubmit} className="mx-auto flex flex-col gap-4">
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
                    }

                    return <></>;
                  })}
                </div>
                <div className="flex flex-col gap-4">
                  <Button
                    type="submit"
                    color="light-blue"
                    size="lg"
                  >
                    Add Student
                  </Button>
                </div>
              </form>
            )
          }}
        </Formik>
      </DialogBody>
    </Dialog>
  )
}
