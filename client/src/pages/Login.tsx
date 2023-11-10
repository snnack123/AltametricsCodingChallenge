import { useCallback, useState } from "react";
import AppLogo from "../assets/Altametrics_logo.webp";
import { ILoginReqDto, LoginResponse } from "../types/interfaces";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../app/reducers/userReducer";
import { API } from "../app/api";
import { AxiosResponse } from "axios";
import FormikBase, { DefaultOnSubmit } from "../components/Forms/FormikBase";
import { loginSchema } from "../yupSchemas";
import { loginInitialValues } from "../utils/constants";
import { Form, FormikValues,} from 'formik';
import FormField from "../components/Forms/FormField";

export default function Login() {
  const [invalidCredentials, setInvalidCredentials] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = useCallback(async (email:string, password:string) => {
    const userData: ILoginReqDto = {
      email,
      password,
    };

    const result: AxiosResponse<LoginResponse> = await API.auth.login(userData);
    const response: LoginResponse = result.data;

    if (response.token) {
      localStorage.setItem("token", response.token);
      dispatch(setToken(response.token));

      setTimeout(() => {
        navigate("/");
      }, 500);
    } else {
      setInvalidCredentials(response.message);
    }
  }, []);

  const submitHandler = useCallback(async (values:FormikValues) => {
    loginHandler(values.email, values.password);
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
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <FormikBase
          validateOnBlur
          validateOnChange
          validationSchema={loginSchema}
          initialValues={loginInitialValues}
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
                label="Password"
                name="password"
                type="password"
                placeholder="********"
                className="inputStyles">
                  <div className="text-sm">
                    <Link
                      to="/login"
                      className="font-semibold text-primary hover:text-primary">
                      Forgot password?
                    </Link>
                  </div>
              </FormField>

              <div>
                <button
                  type="submit"
                  className="formButton">
                  Sign in
                </button>
              </div>
              <p className="text-center text-sm font-medium text-red-500">
                {invalidCredentials.length > 0 ? (
                  invalidCredentials
                ) : (
                  <span>&nbsp;</span>
                )}
              </p>
            </Form>
          )}
        </FormikBase>
        <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to="/register" className="font-semibold leading-6 text-primary">
              Register now!
            </Link>
          </p>
      </div>
    </div>
  );
}
