"use client";

import type { ThemeProviderProps } from "next-themes";

import { store } from "@/redux/store";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import AuthProvider from "@/components/auth/AuthProvider";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>
          <AuthProvider>{children}</AuthProvider>
        </NextThemesProvider>
      </HeroUIProvider>
      <Toaster />
    </Provider>
  );
}
