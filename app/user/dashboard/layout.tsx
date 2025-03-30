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
  Hourglass,
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
import toast from "react-hot-toast";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
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
      disabled: true,
    },
    {
      icon: PiggyBank,
      label: "Goals",
      href: "/user/dashboard/goals",
      active: pathname === "/user/dashboard/goals",
      disabled: true,
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/user/dashboard/settings",
      active: pathname === "/user/dashboard/settings",
      disabled: true,
    },
  ];

  const dispatch = useAppDispatch();

  return (
    <SidebarProvider className=''>
      <div className='flex h-screen w-full bg-cornsilk'>
        <Sidebar
          variant='inset'
          collapsible='icon'
          className=' bg-white sm:bg-dark-moss-green  flex flex-col items-center justify-center  h-full text-primary-foreground'
        >
          <SidebarHeader>
            <div className='flex items-center gap-2 px-2'>
              <ToggleLogo />
            </div>
          </SidebarHeader>
          <SidebarContent className='flex-1 '>
            <SidebarMenu className='mt-20 space-y-4 p-2 text-lg'>
              {routes.map((route) => (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={route.active}
                    tooltip={route.label}
                  >
                    {route.disabled ? (
                      <div
                        onClick={() => {
                          toast.success("This feature will be available soon", {
                            duration: 3000,
                            icon: (
                              <div className='p-1 rounded-full bg-blue-500'>
                                <Hourglass className=' text-white' size={16} />
                              </div>
                            ),
                          });
                        }}
                        className='w-full cursor-pointer bg-transparent text-white hover:bg-transparent hover:text-white text-left '
                      >
                        <route.icon className='h-8 w-8' />
                        <p className='text-lg'>{route.label}</p>
                      </div>
                    ) : (
                      <Link
                        onClick={() => {
                          // setOpenMobile(false);
                        }}
                        href={route.href}
                        className='flex items-center gap-2 '
                      >
                        <route.icon className='h-8 w-8' />
                        <p
                          className={`text-lg ${route.active ? "font-bold" : ""}`}
                        >
                          {route.label}
                        </p>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem className=''>
                <Button
                  style={{
                    borderRadius: "0.5rem",
                  }}
                  color='primary'
                  className='flex w-full items-center rounded-lg gap-2'
                  onPress={async () => {
                    await SignOut();
                    dispatch(logout());
                  }}
                >
                  <LogOut className='h-5 w-5' />
                  <span>Logout</span>
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className='flex flex-col dark:bg-[#1d1d1d]'>
          <header className='border-b border-secondary/20 bg-white/50  dark:bg-[#1d1d1d] '>
            <div className='flex h-16 items-center justify-between px-4'>
              <div className='flex items-center gap-2'>
                <SidebarTrigger />
                <h1 className='text-xl font-semibold text-primary dark:text-white'>
                  Dashboard
                </h1>
              </div>
              <div className='flex items-center gap-4'>
                <ThemeSwitch />
                <Dropdown>
                  <DropdownTrigger>
                    <Avatar>
                      <AvatarImage src='/placeholder-user.jpg' alt='User' />
                      <AvatarFallback className='bg-accent text-primary-foreground'>
                        {isLoaded && session?.name?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownTrigger>
                  <DropdownMenu aria-label='Static Actions'>
                    {/* <DropdownItem key='copy'>Copy link</DropdownItem> */}
                    <DropdownItem
                      key='logout'
                      className='text-danger flex items-center gap-2 w-full'
                      color='danger'
                    >
                      <div
                        className='flex items-center gap-2'
                        onClick={async () => {
                          await SignOut();
                          dispatch(logout());
                        }}
                      >
                        <LogOut size={16} />
                        Logout
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </header>
          <main className='flex-1 overflow-auto p-4 md:p-6'>{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
function ToggleLogo() {
  const { open } = useSidebar();

  return (
    <>
      <PiggyBank className={`${open ? "h-6 w-6" : "h-10 w-10"} text-accent`} />

      {open && (
        <>
          <span className='text-xl font-bold text-primary-foreground transition-all duration-300'>
            BudgetEase
          </span>
        </>
      )}
    </>
  );
}
