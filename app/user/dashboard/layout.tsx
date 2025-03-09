"use client";

import type React from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  CreditCard,
  Home,
  LogOut,
  PiggyBank,
  Settings,
  Tag,
  Menu,
} from "lucide-react";
// import { Button } from "@/components/ui/button";
import { Button } from "@heroui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { SignOut } from "@/utils/db";
import { logout } from "@/redux/features/authSlice";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authData = useAppSelector((state) => state.auth);
  const session: any = authData.session;
  const pathname = usePathname();
  const isLoaded = authData.isLoaded;

  const router = useRouter();
  const routes = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/user/dashboard",
      active: pathname === "/user/dashboard",
    },
    {
      icon: BarChart3,
      label: "Budget",
      href: "/user/dashboard/budget",
      active: pathname === "/user/dashboard/budget",
    },
    {
      icon: Tag,
      label: "Categories",
      href: "/user/dashboard/categories",
      active: pathname === "/user/dashboard/categories",
    },
    {
      icon: CreditCard,
      label: "Accounts",
      href: "/user/dashboard/accounts",
      active: pathname === "/user/dashboard/accounts",
    },
    {
      icon: PiggyBank,
      label: "Goals",
      href: "/user/dashboard/goals",
      active: pathname === "/user/dashboard/goals",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/user/dashboard/settings",
      active: pathname === "/user/dashboard/settings",
    },
  ];

  const dispatch = useAppDispatch();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-cornsilk">
        <Sidebar
          variant="inset"
          collapsible="icon"
          className="bg-dark-moss-green flex flex-col items-center justify-center  h-full text-primary-foreground"
        >
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <PiggyBank className="h-6 w-6 text-accent" />
              <span className="text-xl font-bold text-primary-foreground">
                BudgetEase
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent className="flex-1 ">
            <SidebarMenu className="mt-20 space-y-4 p-2 text-lg">
              {routes.map((route) => (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={route.active}
                    tooltip={route.label}
                  >
                    <Link
                      href={route.href}
                      className="flex items-center gap-2 "
                    >
                      <route.icon className="h-8 w-8" />
                      <p
                        className={`text-lg ${route.active ? "font-bold" : ""}`}
                      >
                        {route.label}
                      </p>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem className="">
                <Button
                  style={{
                    borderRadius: "0.5rem",
                  }}
                  color="primary"
                  className="flex w-full items-center rounded-lg gap-2"
                  onPress={() => {
                    SignOut();
                    dispatch(logout());
                    router.push("/");
                  }}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col">
          <header className="border-b border-secondary/20 bg-white/50">
            <div className="flex h-16 items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold text-primary">
                  Dashboard
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback className="bg-accent text-primary-foreground">
                    {isLoaded && session?.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
