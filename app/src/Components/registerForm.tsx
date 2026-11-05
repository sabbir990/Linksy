
"use client";

import React, { useState } from "react";
import registerSchema from "../Frontend Schemas/registerSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type RegisterFormData = z.infer<typeof registerSchema>;

type BasicInfo = {
  name: string;
  email: string;
};

export default function RegisterForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    name: "",
    email: "",
  });
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  // Step 1: Validate name and email
  const handleBasicInfo = async () => {
    const isValid = await trigger(["name", "email"]);

    if (!isValid) return;

    setBasicInfo({
      name: getValues("name"),
      email: getValues("email"),
    });

    setStep(2);
  };

  // Step 2: Temporary OTP verification
  // For now, any six-digit code is accepted.
  const handleVerifyOtp = () => {
    if (!/^\d{6}$/.test(otp)) {
      setOtpError("Please enter a valid 6-digit code.");
      return;
    }

    setOtpError("");
    setStep(3);
  };

  // Step 3: Final registration submission
  const onRegisterSubmit = (data: RegisterFormData) => {
    console.log("Registration data:", {
      name: data.name,
      email: data.email,
      password: data.password,
    });

    // Connect your registration API here.
    // Do not send confirmPassword unless your API requires it.
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-xl border-2 border-gray-200 p-4 sm:p-6">
      {/* Progress indicator */}
      <div className="mb-8 flex items-center justify-between gap-2">
        {[
          { number: 1, label: "Details" },
          { number: 2, label: "Verify email" },
          { number: 3, label: "Password" },
        ].map((item) => (
          <div key={item.number} className="flex flex-1 flex-col gap-2">
            <div
              className={`h-1.5 rounded-full ${
                step >= item.number
                  ? "bg-indigo-600"
                  : "bg-gray-200"
              }`}
            />
            <span
              className={`text-xs sm:text-sm ${
                step === item.number
                  ? "font-semibold text-indigo-600"
                  : "text-gray-500"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* STEP 1: Name and Email */}
      {step === 1 && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void handleBasicInfo();
          }}
          className="space-y-5"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Enter your name and email to get started.
            </p>
          </div>

          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-semibold"
            >
              Full name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              className="w-full min-w-0 rounded-md border-2 border-gray-300 p-3 outline-none transition focus:border-indigo-500"
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-semibold"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full min-w-0 rounded-md border-2 border-gray-300 p-3 outline-none transition focus:border-indigo-500"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md border-2 border-indigo-600 bg-indigo-600 p-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Continue
          </button>
        </form>
      )}

      {/* STEP 2: OTP */}
      {step === 2 && (
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Verify your email
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Enter the six-digit code for{" "}
              <span className="font-medium text-gray-800">
                {basicInfo.email}
              </span>
            </p>
          </div>

          <div>
            <label
              htmlFor="otp"
              className="mb-2 block font-semibold"
            >
              Verification code
            </label>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={otp}
              onChange={(event) => {
                setOtp(
                  event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6)
                );
                setOtpError("");
              }}
              placeholder="000000"
              className="w-full rounded-md border-2 border-gray-300 p-3 text-center text-2xl tracking-[0.5em] outline-none focus:border-indigo-500"
            />
            {otpError && (
              <p className="mt-1 text-sm text-red-500">
                {otpError}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleVerifyOtp}
            className="w-full rounded-md border-2 border-indigo-600 bg-indigo-600 p-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Verify email
          </button>

          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full text-sm font-medium text-gray-500 hover:text-indigo-600"
          >
            Back to details
          </button>
        </div>
      )}

      {/* STEP 3: Password */}
      {step === 3 && (
        <form
          onSubmit={handleSubmit(onRegisterSubmit)}
          className="space-y-5"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Set your password
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Email step completed for {basicInfo.email}.
            </p>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-semibold"
            >
              New password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              className="w-full min-w-0 rounded-md border-2 border-gray-300 p-3 outline-none transition focus:border-indigo-500"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block font-semibold"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              className="w-full min-w-0 rounded-md border-2 border-gray-300 p-3 outline-none transition focus:border-indigo-500"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md border-2 border-indigo-600 bg-indigo-600 p-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>

          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full text-sm font-medium text-gray-500 hover:text-indigo-600"
          >
            Back to email verification
          </button>
        </form>
      )}
    </div>
  );
}
