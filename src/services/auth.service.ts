import { LoginResponse, VerifyPasswordResponse, User } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://querymate-backend-service.onrender.com';

interface SignupData {
  name: string;
  email: string;
  mobile_number: string;
  password: string;
}

interface SignupResponse {
  success: boolean;
  data?: User;
  message?: string;
}

class AuthService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/api/v1`;
  }

  /**
   * Register a new user
   * @param userData User registration data
   * @returns Promise with user data if successful
   */
  async signup(userData: SignupData): Promise<SignupResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/users/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Signup failed');
    }
  }

  /**
   * Initiates the login process with email
   * @param email User's email address
   * @returns Promise with user data if successful
   */
  async login(email: string): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: email,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data: LoginResponse = await response.json();
      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  }

  /**
   * Verifies user's password
   * @param userId User's ID
   * @param password User's password
   * @returns Promise with success status
   */
  async verifyPassword(userId: number, password: string): Promise<VerifyPasswordResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/verify_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: userId,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Password verification failed');
      }

      const data: VerifyPasswordResponse = await response.json();
      return data;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Password verification failed'
      );
    }
  }

  /**
   * Complete login process with both email and password
   * @param email User's email
   * @param password User's password
   * @returns Promise with user data if successful
   */
  async loginWithPassword(email: string, password: string): Promise<LoginResponse> {
    // First, get user data with email
    const loginResponse = await this.login(email);
    
    if (!loginResponse.success || !loginResponse.data) {
      throw new Error(loginResponse.message || 'Login failed');
    }

    // Then verify password
    const verifyResponse = await this.verifyPassword(loginResponse.data._id, password);
    
    if (!verifyResponse.success) {
      throw new Error(verifyResponse.message || 'Invalid password');
    }

    return loginResponse;
  }
}

// Export a singleton instance
export const authService = new AuthService(); 