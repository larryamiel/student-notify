import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Option, Select, Typography } from '@material-tailwind/react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import { departments } from '@/data/departments';
import { useAuth } from '@/context/auth-context';

export default function StudentEdit ({ student, open, toggle, onSuccess }) {
  const { user } = useAuth();

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
      name: "number",
      label: "Number",
      placeholder: "Phone Number",
      type: "text",
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
    number: Yup.string().required(),
    department: Yup.string().required(),
    year: Yup.string().required(),
  });
  
  const handleSubmit = (values) => {
    try {
      if (onSuccess) onSuccess(values);
    } catch (error) {
      console.log(error);
    }
  }

  if (!student) return <></>;

  return (
    <Dialog size="sm" open={open} handler={toggle}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          student_id: student.student_id,
          name: student.name,
          number: student.number,
          department: student.department,
          year: student.year,
        }}
        onSubmit={handleSubmit}
      >
        {(props) => {
          return (
            <form onSubmit={props.handleSubmit} className="mx-auto flex flex-col gap-4">
              <DialogHeader>Edit Student</DialogHeader>
              
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
                >
                  Update
                </Button>
              </DialogFooter>
            </form>
          )
        }}
      </Formik>
    </Dialog>
  )
}
