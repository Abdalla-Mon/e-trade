import { Link, Navigate } from "react-router-dom";
import { Input } from "../../fixed-component/Input";
import { authFnc } from "../AuthProvider";
import { useForm } from "react-hook-form";
import { auth } from "../../../firebaseConfig/firebaseConfig";

export default function ResetPassword() {
  const { formState, register, handleSubmit } = useForm();
  const { errors } = formState;
  const signFnc = authFnc();

  function submit(e) {
    // signUp()
    signFnc.reset(e.sign_email);
  }
  if (authFnc().logined) {
    return <Navigate to={"/profile"} replace={true} />;
  }
  return (
    <div className="login sign-up reset">
      <div className="lap:flex gap-6 ">
        <div className="left hidden lap:block lap:w-2/5"></div>
        <form
          className="right lap:w-3/5"
          noValidate
          onSubmit={handleSubmit(submit)}
        >
          <div className="container mx-auto items-start">
            <div className="logo">
              <Link to="/">
                <img src="./logo.png" alt="logo" />
              </Link>
            </div>
            <h1>Forgot Password?</h1>
            <h4>
              Enter the email address you used when you joined and we&apos;ll
              send you instructions to reset your password.
            </h4>
            <h4>
              Not a member? <Link to="/signup">Sign Up </Link>
            </h4>
            <div className="form-flex flex flex-col gap-6">
              <Input
                id={"sign_email"}
                type={"email"}
                e={"Email"}
                register={register}
                errors={errors}
                pattern={{
                  required: {
                    value: true,
                    message: "Please enter your email",
                  },
                }}
              />

              <button>Reset Password</button>
              <Link to="/login" className="login-link">
                Login
              </Link>
              <p className="error">{signFnc?.resetError}</p>
            </div>
          </div>
        </form>
      </div>{" "}
    </div>
  );
}
