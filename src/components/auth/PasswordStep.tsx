import React, { useState } from "react";
import { authService } from "../../services/auth.service";
import { Lock, ArrowLeft } from "lucide-react";

interface PasswordStepProps {
  userId: number;
  email: string;
  onBack: () => void;
  onLoginSuccess: (data: any) => void;
}

export function PasswordStep({
  userId,
  email,
  onBack,
  onLoginSuccess,
}: PasswordStepProps) {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await authService.verifyPassword(userId, password);
      if (response.success) {
        // Re-fetch user data to get complete profile
        const userData = await authService.login(email);
        onLoginSuccess(userData.data);
      } else {
        setError(response.message || "Invalid password");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Password verification failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <Lock className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Enter your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter your password for
            <br />
            <span className="font-medium text-gray-900">{email}</span>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            <button
              type="button"
              onClick={onBack}
              className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
