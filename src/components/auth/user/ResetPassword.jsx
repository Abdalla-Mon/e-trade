import { Link, Navigate } from "react-router-dom";
import { Input } from "../../fixed-component/Input";
import { authFnc } from "../AuthProvider";
import { useForm } from "react-hook-form";
import { FaChevronLeft } from "react-icons/fa";
import { useState } from "react";
export default function ResetPassword() {
  const { formState, register, handleSubmit } = useForm();
  const { errors } = formState;
  const signFnc = authFnc();
  const [reset, setReset] = useState(false);
  function submit(e) {
    // signUp()
    signFnc.reset(e.sign_email);
  }
  if (authFnc().logined) {
    return <Navigate to={"/profile"} replace={true} />;
  }
  return (
    <div className=" sign-up reset">
      <div className="lap:flex gap-6 ">
        <div className="left hidden lap:block lap:w-2/5"></div>
        <form
          className="right lap:w-3/5"
          noValidate
          onSubmit={handleSubmit(submit)}
        >
          <div className="container mx-auto ">
            <div className="logo flex items-center gap-3">
              <Link to={"/login"} className="icon">
                <FaChevronLeft />
              </Link>
              <Link to="/">
                <img src="./logo.png" alt="logo" />
              </Link>
            </div>

            <h1>Forgot Password?</h1>
            <h4 className="reset-text">
              {!reset
                ? " Enter the email address you used when you joined and we'll send you instructions to reset your password."
                : "             We have sent a password reset email to email address with a link to reset your password. Please check your email and click the link to reset your password."}
            </h4>
            <h4>
              Not a member? <Link to="/signup">Sign Up </Link>
            </h4>
            <div className="form-flex flex flex-col gap-6">
              {!reset && (
                <>
                  <Input
                    id={"reset_email"}
                    type={"email"}
                    e={"Email"}
                    register={register}
                    errors={errors}
                    pattern={{
                      required: {
                        value: true,
                        message: "Please enter an email",
                      },
                      pattern: {
                        value: /\w+@[a-z]+\.[a-z]{2,}/gi,
                        message: "Please enter a valid email",
                      },
                    }}
                  />

                  <button
                    onClick={() => {
                      if (!signFnc.resetError) {
                        setReset(true);
                      } else {
                        setReset(false);
                      }
                    }}
                  >
                    Reset Password
                  </button>
                  <p className="error">{signFnc?.resetError}</p>
                </>
              )}
            </div>
          </div>
        </form>
      </div>{" "}
    </div>
  );
}
