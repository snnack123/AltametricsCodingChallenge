import { useCallback, useState } from "react";
import AppLogo from "../assets/Altametrics_logo.webp";
import { RegisterFormData, RegisterResponse } from "../types/interfaces";
import { API } from "../app/api";
import { AxiosResponse } from "axios";
import FormikBase, { DefaultOnSubmit } from "../components/Forms/FormikBase";
import { Form, FormikValues,} from 'formik';
import { registerSchema } from "../yupSchemas";
import { registerInitialValues } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import FormField from "../components/Forms/FormField";
import FormRequestMessage from "../components/Forms/FormRequestMessage";

export default function Register() {
  const [requestMessage, setRequestMessage] = useState<string>("");
  const [requestError, setRequestError] = useState<boolean>(false);

  const navigate = useNavigate();

  const registerHandler = useCallback(async (values: FormikValues) => {
    const { email, password, name } = values as RegisterFormData;

    const userData: RegisterFormData = {
      email,
      password,
      name,
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
    registerHandler(values);
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
              <FormField
                label="Email address"
                name="email"
                type="email"
                placeholder="email"
                className="inputStyles"
              />
              <FormField
                label="Full name"
                name="name"
                type="text"
                placeholder="Full Name"
                className="inputStyles"
              />

              <FormField
                label="Password"
                name="password"
                type="password"
                placeholder="********"
                className="inputStyles"
              />

              <FormField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="********"
                className="inputStyles"
              />

              <div>
                <button
                  disabled={requestMessage.length > 0 && !requestError}
                  type="submit"
                  className="formButton">
                    Sign up 
                </button>
              </div>
              <FormRequestMessage requestMessage={requestMessage} requestError={requestError} />
            </Form>
          )}
        </FormikBase>
      </div>
    </div>
  );
}
