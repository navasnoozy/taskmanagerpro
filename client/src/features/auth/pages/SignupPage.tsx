

import { signupSchema, type SignupInput } from "../../../schemas/auth.schema";
import { Stack } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import AlertNotify from "../../../components/Alert";
import AppButton from "../../../components/AppButton";
import CardContainer from "../../../components/CardContainer";
import { Form } from "../../../components/Form";
import FormInputField from "../../../components/FormInputField";
import useAppNavigate from "../../../hooks/useAppNavigate";
import AuthSwitchLink from "../components/AuthSwitchLink";
import Divider from "../components/Divider";
import useSignupUser from "../hooks/useSignup";
import GoogleLogin from "./GoogleLogin";
import FormPasswordField from "../../../components/PasswordInput";

const SignupPage = () => {
  const {  goHome } = useAppNavigate();
  const [errors, setErrors] = useState<{ message: string; field?: string }[] | null>(null);

  const { mutateAsync: signup, isPending } = useSignupUser();

  const handleSignup = (data: SignupInput) => {
    toast.promise(
      signup(data, {
        onSuccess: () => {
          goHome();
        },
        onError: (error) => {
          setErrors(error.response?.data.errors || null);
        },
      }),
      {
        pending: "Creating account...",
        success: "Account created! Please sign in.",
        error: "Failed to create account",
      }
    );
  };

  return (
    <CardContainer heading={"Create Account"}>
      <Form onSubmit={handleSignup} schema={signupSchema}>
        <Stack spacing={3}>
          <FormInputField type="name" name="name" label={"Name"} />
          <FormInputField name="email" label={"Email"} type="email" />
          <FormPasswordField name="password" label={"Password"}/>
          <FormPasswordField name="confirmPassword" label={"ConfirmPassword"} />
          <AppButton isLoading={isPending} variant="contained" type="submit">
            Signup
          </AppButton>
        </Stack>
      </Form>
      <AlertNotify success={false} messages={errors}></AlertNotify>
      <AuthSwitchLink mode="signup" />
      <Divider />
      <GoogleLogin />
    </CardContainer>
  );
};

export default SignupPage;
