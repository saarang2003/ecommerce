import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { toast, useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


const initialState = {
  email: "",
  password: "",
};

export default function  AuthLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast();

  const [formData, setFormData] = useState(initialState);


  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/register");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
    <div className="text-center">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Sign in to your account
      </h1>
      <p className="mt-2">
        Do not have an account
        <Link
          className="font-medium ml-2 text-primary hover:underline"
          to="/auth/register"
        >
          Register
        </Link>
      </p>
    </div>
    <CommonForm
      formControls={loginFormControls}
      buttonText={"Log in"}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
    />
  </div>
  )
}
