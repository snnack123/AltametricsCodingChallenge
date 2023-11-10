import { useCallback, useState } from "react";
import AppLogo from "../assets/Altametrics_logo.webp";
import { LoginFormData, RegisterResponse } from "../types/interfaces";
import { API } from "../app/api";
import { AxiosResponse } from "axios";
import FormikBase, { DefaultOnSubmit } from "../components/FormikBase";
import { ErrorMessage, Field, Form, FormikValues,} from 'formik';
import { registerSchema } from "../yupSchemas";
import { registerInitialValues } from "../utils/constants";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [requestMessage, setRequestMessage] = useState<string>("");
  const [requestError, setRequestError] = useState<boolean>(false);

  const navigate = useNavigate();

  const registerHandler = useCallback(async (email:string, password:string) => {
    const userData: LoginFormData = {
      email,
      password,
    };

    const result: AxiosResponse<RegisterResponse> = await API.auth.register(userData);
    const response: RegisterResponse = result.data;

    if (response.status) {
      setRequestError(false);

      setTimeout(() => {
        navigate("/login");
      } , 1000);
    } else {
      setRequestError(true);
    }

    setRequestMessage(response.message);
  }, []);

  const submitHandler = useCallback(async (values:FormikValues) => {
    registerHandler(values.email, values.password);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center flex-col">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src={AppLogo}
          alt="Altametrics logo"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register to Altametrics
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <FormikBase
          validateOnBlur
          validationSchema={registerSchema}
          initialValues={registerInitialValues}
          onSubmit={submitHandler as DefaultOnSubmit}
          >
          {() => (
            <Form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="labelStyles">
                  Email address
                </label>
                <div className="mt-2">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email"
                    className="inputStyles"
                  />
                  <ErrorMessage name="email" component='div' className='errorMessage'/>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="labelStyles">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="inputStyles"
                  />
                  <ErrorMessage name="password" component='div' className='errorMessage'/>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirmPassword"
                    className="labelStyles">
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className="inputStyles"
                  />
                  <ErrorMessage name="confirmPassword" component='div' className='errorMessage'/>
                </div>
              </div>

              <div>
                <button
                  disabled={requestMessage.length > 0 && !requestError}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    Sign up 
                </button>
              </div>
              <p className={`text-center text-sm font-medium ${requestError ? 'text-red-500' : 'text-green-500'}`}>
                {requestMessage.length > 0 ? (
                  requestMessage
                ) : (
                  <span>&nbsp;</span>
                )}
              </p>
            </Form>
          )}
        </FormikBase>
      </div>
    </div>
  );
}
