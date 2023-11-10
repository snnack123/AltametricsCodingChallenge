import { ILoginReqDto, IRegisterDto } from "../types/interfaces";
import { NavigationItem } from "../types/types";

export const navigation: NavigationItem[] = [
  { name: "Home", href: "/", current: false },
  { name: "Dashboards", current: false, children: [] },
  { name: "Invoices", href: "/invoices", current: false, children: [] },
  { name: "Bills", current: false, children: [] },
  { name: "Expenses", current: false, children: [] },
  { name: "Reports", current: false, children: [] },
  { name: "Accounting", current: false, children: [] },
];

export const loginInitialValues: ILoginReqDto = {
  email: "",
  password: "",
};

export const registerInitialValues: IRegisterDto = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const paginationItemsPerPage = 6;