export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface User {
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse<T = any> {
  successful: boolean;
  result?: T;
  errors?: string[];
}

export interface LoginResponse extends AuthResponse<string> {
  user?: User;
}
