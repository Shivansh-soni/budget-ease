"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@heroui/input";
import { Label } from "@/components/ui/label";
import { Tabs, Tab } from "@heroui/tabs";
import { PiggyBank } from "lucide-react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isResetPassword, setIsResetPassword] = useState(false);
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cornsilk p-4 md:p-8">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <PiggyBank className="h-8 w-8 text-accent" />
        <span className="text-2xl font-bold text-primary">BudgetEase</span>
      </Link>

      {isResetPassword ? (
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col gap-4 items-start">
            <h2 className="text-2xl text-primary">Reset Password</h2>
            <h2>
              Enter your email address and we'll send you a link to reset your
              password.
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="name@example.com"
              />
            </div>
          </CardBody>
          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full bg-accent hover:bg-accent-secondary">
              Send Reset Link
            </Button>
            <Button
              variant="ghost"
              className="text-dark-moss-green hover:text-accent"
              onPress={() => setIsResetPassword(false)}
            >
              Back to login
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="w-full max-w-md">
          <Tabs
            className="w-full"
            classNames={{
              tabList: "w-full",
            }}
          >
            <Tab key="login" title="Login">
              <Login setIsResetPassword={setIsResetPassword} />
            </Tab>
            <Tab key="signup" title="Sign Up">
              <Signup />
            </Tab>
          </Tabs>
        </div>
      )}

      <p className="mt-8 text-center text-sm text-dark-moss-green">
        By continuing, you agree to BudgetEase's{" "}
        <Link href="#" className="underline hover:text-accent">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="underline hover:text-accent">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
