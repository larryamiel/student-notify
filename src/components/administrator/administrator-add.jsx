import useAdministrator from '@/hooks/use-administrator';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Option, Select, Typography } from '@material-tailwind/react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import { departments } from '@/data/departments';

export default function AdministratorAdd ({ open, toggle, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const { addAdministrator } = useAdministrator();

  const fields = [
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
      options: departments.map((department) => ({
        label: department.name,
        value: department.id,
      }))
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Email",
      type: "text",
    }
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    department: Yup.string().required(),
    email: Yup.string().email().required(),
  });
  
  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      await addAdministrator(values);
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
          name: '',
          department: '',
          email: '',
        }}
        onSubmit={handleSubmit}
      >
        {(props) => {
          return (
            <form onSubmit={props.handleSubmit} className="mx-auto flex flex-col gap-4">
              <DialogHeader>Add Administrator</DialogHeader>
              
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
                  disabled={isLoading}
                >
                  Add Administrator
                </Button>
              </DialogFooter>
            </form>
          )
        }}
      </Formik>
    </Dialog>
  )
}
