import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "../ui/label";
import { signupSchema } from "@/utils/validattions";
import toast from "react-hot-toast";
import { getAccount, ID } from "@/utils/db";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/features/authSlice";
import { signIn, signUp } from "@/utils/db/Auth";
import { createUser } from "@/utils/db/Users";
export interface SignupFormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirm: string;
}
const defaultValues: SignupFormData = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirm: "",
};
function Signup() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, control } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    const loginToast = toast.loading("Creating account...");
    let accountCreated = false;
    if (data.password !== data.confirm) {
      toast.error("passwords do not match", { id: loginToast });
      return;
    }
    const account = await getAccount();
    const userID = ID.unique();

    setIsLoading(true);

    await signUp(
      data.email,
      data.password,
      `${data.firstName} ${data.lastName}`
    );

    try {
      const email = data.email;
      const password = data.password;
      if (!email || !password || !accountCreated) {
        toast.error("Invalid email or password", { id: loginToast });
        return;
      }
      await signIn(data.email, data.password);
      const promise = account.get();
      promise.then(
        async function (response) {
          dispatch(
            login({
              id: response.$id,
              name: response.name,
              email: response.email,
            })
          );
          await createUser({
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            role: "user",
            id: userID,
          });
          toast.success("Account created, kindly sign in ", { id: loginToast });
          router.push("/");
          return response;
        },
        function (error) {
          console.log(error);
          return null;
        }
      );
    } catch (error) {
      console.log("error while signing in", error);
      toast.error("Failed to create account", { id: loginToast });
    }

    setIsLoading(false);
  };

  const onError = (error: any) => {
    console.log("error", error);
  };
  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 items-start">
        <h2 className="text-2xl text-primary">Create an account</h2>
        <h2>Enter your information to create an account</h2>
      </CardHeader>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <CardBody className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="firstName"
              control={control}
              render={({ field, fieldState: { error, invalid } }) => (
                <div className="space-y-2">
                  <>
                    <Label htmlFor="name">First Name</Label>
                    <Input
                      {...field}
                      isInvalid={invalid}
                      color={invalid ? "danger" : "default"}
                      errorMessage={error?.message}
                      id="firstName"
                      type="text"
                      placeholder="name"
                    />
                  </>
                </div>
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field, fieldState: { error, invalid } }) => (
                <div className="space-y-2">
                  <>
                    <Label htmlFor="last-name">Last name</Label>
                    <Input
                      {...field}
                      isInvalid={invalid}
                      color={invalid ? "danger" : "default"}
                      errorMessage={error?.message}
                      id="lastName"
                      type="text"
                      placeholder="last name"
                    />
                  </>
                </div>
              )}
            />
          </div>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error, invalid } }) => (
              <div className="space-y-2">
                <>
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    {...field}
                    isInvalid={invalid}
                    color={invalid ? "danger" : "default"}
                    errorMessage={error?.message}
                    id="signup-email"
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
                  <Label htmlFor="password">Password</Label>
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
          <Controller
            name="confirm"
            control={control}
            render={({ field, fieldState: { error, invalid } }) => (
              <div className="space-y-2">
                <>
                  <Label htmlFor="confirm">Confirm Password</Label>
                  <Input
                    {...field}
                    isInvalid={invalid}
                    className="transition-all ease-in-out"
                    color={invalid ? "danger" : "default"}
                    errorMessage={error?.message}
                    id="confirm"
                    placeholder="Enter password"
                    endContent={
                      <>
                        {showConfirmPassword ? (
                          <EyeOffIcon
                            onClick={() => {
                              setShowConfirmPassword(false);
                            }}
                          />
                        ) : (
                          <EyeIcon
                            onClick={() => {
                              setShowConfirmPassword(true);
                            }}
                          />
                        )}
                      </>
                    }
                    type={showConfirmPassword ? "text" : "password"}
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
            Create Account
          </Button>
        </CardFooter>
      </Form>
    </Card>
  );
}

export default Signup;
