import React, { useState } from "react";
import { EmailStep } from "./EmailStep";
import { PasswordStep } from "./PasswordStep";
import { Signup } from "./Signup";
import { User } from "../../types/auth";

interface LoginProps {
  onLoginSuccess?: (userData: User) => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
  const [step, setStep] = useState<"email" | "password" | "signup">("email");
  const [userId, setUserId] = useState<number | null>(null);
  const [email, setEmail] = useState<string>("");

  const handleEmailVerified = (
    verifiedUserId: number,
    verifiedEmail: string
  ) => {
    setUserId(verifiedUserId);
    setEmail(verifiedEmail);
    setStep("password");
  };

  const handleLoginSuccess = (userData: User) => {
    // Store user data in localStorage
    localStorage.setItem("user", JSON.stringify(userData));

    // Call the onLoginSuccess prop if provided
    if (onLoginSuccess) {
      onLoginSuccess(userData);
    }

    // The parent component (App) will handle the redirection based on localStorage update
  };

  const handleBack = () => {
    setStep("email");
    setUserId(null);
    setEmail("");
  };

  const handleSwitchToSignup = () => {
    setStep("signup");
    setUserId(null);
    setEmail("");
  };

  const handleSwitchToLogin = () => {
    setStep("email");
    setUserId(null);
    setEmail("");
  };

  if (step === "signup") {
    return (
      <Signup
        onSignupSuccess={handleLoginSuccess}
        onSwitchToLogin={handleSwitchToLogin}
      />
    );
  }

  return (
    <>
      {step === "email" ? (
        <EmailStep
          onEmailVerified={handleEmailVerified}
          onSwitchToSignup={handleSwitchToSignup}
        />
      ) : (
        <PasswordStep
          userId={userId!}
          email={email}
          onBack={handleBack}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}
