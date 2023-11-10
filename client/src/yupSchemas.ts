import * as Yup from "yup";
import { ILoginReqDto } from "./types/interfaces";

export const loginSchema: Yup.ObjectSchema<ILoginReqDto> = Yup.object().shape({
  email: Yup.string().email("Email must be valid").required("A valid email is required"),
  password: Yup.string().required("Password is required"),
});

export const registerSchema: Yup.ObjectSchema<ILoginReqDto> = Yup.object().shape({
  email: Yup.string().email("Email must be valid").required("A valid email is required"),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string().min(6, 'Password confirmation must be at least 6 characters').oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
});
  