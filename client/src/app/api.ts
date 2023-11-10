import axios from "axios";
import { LoginFormData } from "../types/interfaces";
import { API_ROUTES } from "./routes";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/',
});

export const API = {
    auth: {
        login: (data: LoginFormData) => axiosInstance.post(API_ROUTES.auth.login, data),
        register: (data: LoginFormData) => axiosInstance.post(API_ROUTES.auth.register, data),
        check: (token: string) => axiosInstance.get(API_ROUTES.auth.check, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
    },
    invoices: {
        getInvoices: (token: string) => axiosInstance.get(API_ROUTES.invoices.get, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
    }
}