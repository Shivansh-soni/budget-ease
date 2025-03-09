"use client";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getUser } from "@/utils/actions/user.actions";
import React, { useEffect } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isLoaded } = useAppSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const fetchUser = async () => {
      const data: any = await getUser();
      console.log("data", JSON.parse(data));
    };
    fetchUser();
  }, []);
  if (!isLoggedIn && isLoaded) {
    window.location.href = "/";
  } else {
    return <div>{children}</div>;
  }
};

export default layout;
