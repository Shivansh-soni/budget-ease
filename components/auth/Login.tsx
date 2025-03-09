import { login } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { getAccount } from "@/utils/db";
import { loginSchema } from "@/utils/validattions";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Label } from "../ui/label";
export interface LoginFormData {
  email: string;
  password: string;
}

const Login = (props: { setIsResetPassword: (value: boolean) => void }) => {
  const [showPassword, setshowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const loginToast = toast.loading("Logging in...");
    setIsLoading(true);
    try {
      const account = await getAccount();
      await account.createEmailPasswordSession(data?.email, data?.password);
      const session = await account.get();
      dispatch(
        login({
          id: session.$id,
          name: session.name,
          email: session.email,
        })
      );
      toast.success("Logged in", { id: loginToast });
      router.push("/");
    } catch (error) {
      toast.error("Failed to login", { id: loginToast });
    } finally {
      setIsLoading(false);
    }
  };

  const onError = (error: any) => {
    console.log("error", error);
  };

  return (
    <Card className="">
      <CardHeader className="flex flex-col gap-4 items-start">
        <p className="text-2xl text-primary">Login</p>
        <p>Enter your credentials to access your account</p>
      </CardHeader>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <CardBody className="space-y-4">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error, invalid } }) => (
              <div className="space-y-2">
                <>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...field}
                    isInvalid={invalid}
                    color={invalid ? "danger" : "default"}
                    errorMessage={error?.message}
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                  />
                </>
              </div>
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState: { error, invalid } }) => (
              <div className="space-y-2">
                <>
                  <div className="flex items-center justify-between ">
                    <Label htmlFor="password">Password</Label>
                    <Button
                      variant="ghost"
                      className="text-xs  text-dark-moss-green hover:text-accent h-auto"
                      onPress={() => props.setIsResetPassword(true)}
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <Input
                    {...field}
                    isInvalid={invalid}
                    className="transition-all ease-in-out"
                    color={invalid ? "danger" : "default"}
                    errorMessage={error?.message}
                    id="password"
                    placeholder="Enter password"
                    endContent={
                      <>
                        {showPassword ? (
                          <EyeOffIcon
                            onClick={() => {
                              setshowPassword(false);
                            }}
                          />
                        ) : (
                          <EyeIcon
                            onClick={() => {
                              setshowPassword(true);
                            }}
                          />
                        )}
                      </>
                    }
                    type={showPassword ? "text" : "password"}
                  />
                </>
              </div>
            )}
          />
        </CardBody>
        <CardFooter>
          <Button
            isLoading={isLoading}
            type="submit"
            className="w-full bg-accent text-white font-semibold hover:bg-accent-secondary"
          >
            Login
          </Button>
        </CardFooter>
      </Form>
    </Card>
  );
};

export default Login;
