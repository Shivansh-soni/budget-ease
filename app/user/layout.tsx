"use client";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isLoaded } = useAppSelector(
    (state: RootState) => state.auth
  );

  if (!isLoggedIn && isLoaded) {
    window.location.href = "/";
  } else {
    return <div>{children}</div>;
  }
};

export default layout;
