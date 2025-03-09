"use client";
import React from "react";
import { useAppDispatch } from "@/redux/hooks";
import { account } from "@/utils/db";
import { getAuth, login, logout } from "@/redux/features/authSlice";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAuth());
  }, []);
  return <>{children}</>;
};

export default AuthProvider;
