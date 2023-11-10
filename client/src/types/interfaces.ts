export interface ILoginReqDto {
  email: string;
  password: string;
}
export interface LoginResponse {
  message: string;
  token: string | null;
}

export interface RegisterFormData extends ILoginReqDto {
  name: string;
}

export interface RegisterResponse {
  message: string;
  status: boolean;
}

export interface CheckToken {
  validToken: boolean;
}

export interface IRegisterDto {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface InvoiceDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  amount: number;
  dueDate: string;
  details: string;
  userId: number;
  checked?: boolean;
}