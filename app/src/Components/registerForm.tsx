"use client";

import React, { useEffect, useState } from "react";
import registerSchema from "../Frontend Schemas/registerSchema";
import { json, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type RegisterFormData = z.infer<typeof registerSchema>;

type BasicInfo = {
  displayName: string;
  email: string;
};

type otpSendingResponse = {
  success: boolean;
  message: string;
};

type otpTestingResponseType = {
  success: boolean;
  message: string;
};

// Matches the required (non-optional) fields of UserSchemaTypes.
// The optional ones (avatarImageURL, phoneNumber, countryCode) are left out on purpose.
// They will be editable from the user's profile later.
// lastLoggedIn, registeredDate and lastProfileUpdated have schema defaults.
type RegistrationPayload = {
  userId: string;
  displayName: string;
  username: string;
  email: string;
  dateOfBirth: Date;
  country: string;
  password: string;
};

const inputClass =
  "w-full min-w-0 rounded-md border-2 border-gray-300 p-3 outline-none transition focus:border-indigo-500";

export default function RegisterForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    displayName: "",
    email: "",
  });
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      displayName: "",
      username: "",
      email: "",
      dateOfBirth: "",
      country: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  // Step 1: Validate details, then send the OTP
  const handleBasicInfo = async () => {
    const isValid = await trigger([
      "displayName",
      "username",
      "email",
      "dateOfBirth",
      "country",
    ]);

    if (!isValid) return;

    const displayName = getValues("displayName");
    const email = getValues("email");

    setBasicInfo({ displayName, email });

    setIsLoading(true);

    try {
      const sendOTPResponse = await fetch(`/api/send-OTP`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const sendOTPResponseData: otpSendingResponse =
        await sendOTPResponse.json();

      if (sendOTPResponseData.success) {
        setIsLoading(false);
        setStep(2);
      } else {
        setIsLoading(false);
        console.error("Something went wrong: ", sendOTPResponseData);
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  // Step 2: OTP verification
  const handleVerifyOtp = async () => {
    const email = getValues("email");

    const otpCheckingBodyObject = {
      otp,
      email,
    };

    if (!/^\d{6}$/.test(otp)) {
      setOtpError("Please enter a valid 6-digit code.");
      return;
    }

    try {
      const otpTestingRequest = await fetch("/api/verify-email", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(otpCheckingBodyObject),
      });

      const otpTestingResponse: otpTestingResponseType =
        await otpTestingRequest.json();

      if (otpTestingResponse.success) {
        toast.success("Your email is verified now!");
        setOtpError("");
        setStep(3);
      } else {
        toast.error("OTP is not matching! It might be expired or wrong!");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Step 3: Final registration submission
  const onRegisterSubmit = async (data: RegisterFormData) => {
    // confirmPassword is intentionally left out.
    const payload: RegistrationPayload = {
      userId: crypto.randomUUID(), // schema requires it. Move this to the backend if you prefer
      displayName: data.displayName,
      username: data.username,
      email: data.email,
      dateOfBirth: new Date(data.dateOfBirth),
      country: data.country,
      password: data.password, // plain text here. Hash it on the server before saving
    };

    console.log("Registration data:", payload);

    try {
      const registerUserRequest = await fetch("/api/register-user", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      const registerUserResponse = await registerUserRequest.json();

      console.log(registerUserResponse);

      if (registerUserResponse.success) {
        if (registerUserResponse.status === 200) {
          toast.success("You're signed up successfully! Now it's time to log in!");
          router.push(process.env.NEXT_PUBLIC_BASE_URL!);
        } else if (registerUserResponse.status === 204) {
          // console.log("it's in")
          toast("This user is already signed up. Please log in!", {
            icon: "⚠️"
          });
          router.push(process.env.NEXT_PUBLIC_BASE_URL!)
        }
      }

      if (!registerUserResponse.success) {
        if (registerUserResponse.status === 204) {
          // console.log("it's in")
          toast("This user is already signed up. Please log in!", {
            icon: "⚠️"
          });
          router.push(process.env.NEXT_PUBLIC_BASE_URL!)
        }
      }
    } catch (error) {
      console.error(error)
    }

    // Connect your registration API here.
  };

  // Latest allowed date for the date picker (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="w-full min-w-2xl mx-auto rounded-xl border-2 border-gray-200 p-5 sm:p-8">
      {/* Progress indicator */}
      <div className="mb-8 flex items-center justify-between gap-2">
        {[
          { number: 1, label: "Details" },
          { number: 2, label: "Verify email" },
          { number: 3, label: "Password" },
        ].map((item) => (
          <div key={item.number} className="flex flex-1 flex-col gap-2">
            <div
              className={`h-1.5 rounded-full ${step >= item.number ? "bg-indigo-600" : "bg-gray-200"
                }`}
            />
            <span
              className={`text-xs sm:text-sm ${step === item.number
                ? "font-semibold text-indigo-600"
                : "text-gray-500"
                }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* STEP 1: Account details */}
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
              Tell us a bit about you to get started.
            </p>
          </div>

          <div>
            <label htmlFor="displayName" className="mb-2 block font-semibold">
              Display name
            </label>
            <input
              id="displayName"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              className={inputClass}
              {...register("displayName")}
            />
            {errors.displayName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.displayName.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="username" className="mb-2 block font-semibold">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              placeholder="e.g. alex_rivera"
              className={inputClass}
              {...register("username")}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={inputClass}
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="dateOfBirth" className="mb-2 block font-semibold">
                Date of birth
              </label>
              <input
                id="dateOfBirth"
                type="date"
                max={today}
                autoComplete="bday"
                className={inputClass}
                {...register("dateOfBirth")}
              />
              {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="country" className="mb-2 block font-semibold">
                Country
              </label>
              <input
                id="country"
                type="text"
                autoComplete="country-name"
                placeholder="e.g. Bangladesh"
                className={inputClass}
                {...register("country")}
              />
              {errors.country && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer rounded-md border-2 border-indigo-600 bg-indigo-600 p-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin mx-auto" />
            ) : (
              "Continue"
            )}
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
            <label htmlFor="otp" className="mb-2 block font-semibold">
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
                setOtp(event.target.value.replace(/\D/g, "").slice(0, 6));
                setOtpError("");
              }}
              placeholder="000000"
              className="w-full rounded-md border-2 border-gray-300 p-3 text-center text-2xl tracking-[0.5em] outline-none focus:border-indigo-500"
            />
            {otpError && (
              <p className="mt-1 text-sm text-red-500">{otpError}</p>
            )}
          </div>

          <button
            type="button"
            onClick={handleVerifyOtp}
            className="w-full cursor-pointer rounded-md border-2 border-indigo-600 bg-indigo-600 p-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Verify email
          </button>

          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full cursor-pointer text-sm font-medium text-gray-500 hover:text-indigo-600"
          >
            Back to details
          </button>
        </div>
      )}

      {/* STEP 3: Password */}
      {step === 3 && (
        <form onSubmit={handleSubmit(onRegisterSubmit)} className="space-y-5">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Set your password
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Email step completed for <b>{basicInfo.email}</b>.
            </p>
            <div className="space-x-2 text-sm text-gray-600">
              <input
                className="cursor-pointer"
                id="show"
                type="checkbox"
                onChange={(event) => setIsPasswordVisible(event.target.checked)}
              />
              <label className="cursor-pointer" htmlFor="show">
                Show password
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block font-semibold">
              New password
            </label>
            <input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              className={inputClass}
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
              type={isPasswordVisible ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              className={inputClass}
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