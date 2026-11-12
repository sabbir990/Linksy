
"use client";

import React, { useEffect, useState } from "react";
import { UserSchemaTypes } from "../Models/Users";
import { useRouter } from "next/navigation";

type PrivateRouteProps = {
  children: React.ReactNode;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const [isLoggedin, setIsLoggedIn] = useState<UserSchemaTypes | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionCheckRequest = await fetch("/api/check-session", {
          method: "GET",
        });

        const sessionCheckResponse = await sessionCheckRequest.json();

        if (sessionCheckRequest.ok && sessionCheckResponse?.user) {
          setIsLoggedIn(sessionCheckResponse.user);
        } else {
          router.replace("/login");
        }
      } catch (error) {
        console.error("Session verification failed:", error);
        router.replace("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (isLoading || !isLoggedin) {
    return <div>Checking authentication...</div>;
  }

  return <>{children}</>;
}
