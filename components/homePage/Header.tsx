"use client";
import { Button } from "@heroui/button";
import { SignedIn, SignedOut } from "@/components/auth/SignedInOut";
import { SignOut } from "@/utils/db";
import Link from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { LogOutIcon } from "lucide-react";
import { PiggyBank } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/authSlice";
import React from "react";

const navLinks = [
  {
    href: "#features",
    label: "Features",
    protected: false,
  },
  {
    href: "#about",
    label: "About",
    protected: false,
  },
  {
    href: "/contact",
    label: "Contact",
    protected: false,
  },
  {
    href: "/user/dashboard",
    label: "Dashboard",
    protected: true,
  },
];

const Header = () => {
  const dispatch = useAppDispatch();
  return (
    <header className='border-b border-secondary/20 dark:bg-[#1a1a1a]  dark:text-white'>
      <div className='container flex items-center justify-between py-4'>
        <div className='flex items-center gap-2'>
          <PiggyBank className='h-8 w-8 text-accent' />
          <span className='text-2xl font-bold text-primary dark:text-white'>
            BudgetEase
          </span>
        </div>
        <nav className='hidden text-primary  dark:text-white md:flex items-center gap-6'>
          {navLinks.map((link) => (
            <React.Fragment key={link.href}>
              {link.protected ? (
                <SignedIn>
                  <Link
                    key={link.href}
                    href={link.href}
                    className=' hover:text-secondary transition-colors'
                  >
                    {link.label}
                  </Link>
                </SignedIn>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className=' hover:text-secondary transition-colors'
                >
                  {link.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
        <div className='flex items-center gap-4'>
          <div className=''>
            <ThemeSwitch />
          </div>
          <SignedOut>
            <Button
              as={Link}
              href='/auth'
              className='bg-accent hover:bg-accent-secondary'
            >
              Get Started
            </Button>
          </SignedOut>
          <SignedIn>
            <Button
              onPress={() => {
                dispatch(logout());
                SignOut();
              }}
              className='bg-accent hover:bg-accent-secondary'
            >
              <LogOutIcon className='h-4 w-4' /> Logout
            </Button>
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
