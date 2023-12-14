import { useAuth } from "@/context/auth-context";
import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Formik } from "formik";
import * as Yup from "yup";

export function SignIn() {
  const { login } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required().min(6),
  });

  const handleSubmit = (values) => {
    try {
      login(values.email, values.password);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your Student ID and password to Sign In.</Typography>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {props => (
            <form onSubmit={props.handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
              <div className="mb-1 flex flex-col gap-6">   
                <div className="flex flex-col gap-2">
                  <Typography variant="small" color="blue-gray" className="font-medium">
                    Your Student ID
                  </Typography>
                  <Input
                    size="lg"
                    name="email"
                    placeholder="name@mail.com"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                    error={props.touched.email && props.errors.email !== undefined}
                    onChange={props.handleChange}
                  />
                  <div>
                    <Typography variant="paragraph" color="red" className="text-sm font-medium">
                      {props.errors.email && props.touched.email ? props.errors.email : ""}
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Typography variant="small" color="blue-gray" className="font-medium">
                    Password
                  </Typography>
                  <Input
                    type="password"
                    name="password"
                    size="lg"
                    placeholder="********"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={props.values.password}
                    error={props.touched.password && props.errors.password !== undefined}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  <div>
                    <Typography variant="paragraph" color="red" className="text-sm font-medium">
                      {props.errors.password && props.touched.password ? props.errors.password : ""}
                    </Typography>
                  </div>
                </div>
              </div>

              <Button type="submit" className="mt-6" fullWidth>
                Sign In
              </Button>
            </form>
          )}
        </Formik>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;
