export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string | null;
}

export interface RegisterResponse {
  message: string;
  status: boolean;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CheckToken {
  validToken: boolean;
}

export interface ILoginReqDto {
  email: string;
  password: string;
}

export interface IRegisterDto {
  email: string;
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