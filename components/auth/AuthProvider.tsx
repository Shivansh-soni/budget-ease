"use client";
import { getAuth } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import React from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  // throw new Error("AuthProvider is not implemented");
  React.useEffect(() => {
    dispatch(getAuth());
  }, []);
  return <>{children}</>;
};

export default AuthProvider;
