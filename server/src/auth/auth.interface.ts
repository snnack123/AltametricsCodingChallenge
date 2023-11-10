export interface RequestWithUser extends Request {
  user?: UserInfo;
}
export interface UserInfo {
  id: string;
}

export interface CreateUserResponse {
  status: boolean;
  message: string;
}

export interface AuthResponse {
  message: string;
  token: string;
}

export interface AuthCheckResponse {
  validToken: boolean;
}
