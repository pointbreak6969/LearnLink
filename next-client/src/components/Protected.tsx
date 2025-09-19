"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/types";

interface ProtectedProps {
  children: React.ReactNode;
  authentication?: boolean;
  redirectPath?: string;
}

export default function Protected({
  children,
  authentication = false,
  redirectPath = "/",
}: ProtectedProps) {
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state: RootState) => state.auth.status);

  useEffect(() => {
    // For protected routes (authentication = true)
    if (authentication && !authStatus) {
      router.replace("/login");
      return;
    }

    // For public routes (authentication = false) where user is authenticated
    if (!authentication && authStatus) {
      router.replace(redirectPath);
      return;
    }

    setLoader(false);
  }, [authStatus, authentication, router, redirectPath]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
