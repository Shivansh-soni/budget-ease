"use client";
import { useAppSelector } from "@/redux/hooks";
import React from "react";

export const SignedIn = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  if (isLoggedIn) return <>{children}</>;
};

export const SignedOut = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  if (!isLoggedIn) return <>{children}</>;
};
