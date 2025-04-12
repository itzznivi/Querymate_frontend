export interface User {
  _id: number;
  name: string;
  email: string;
  mobile_number: string;
  createdAt: string;
}

export interface LoginResponse {
  success: boolean;
  data: User;
  message?: string;
}

export interface VerifyPasswordResponse {
  success: boolean;
  message?: string;
} 