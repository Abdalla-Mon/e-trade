import { Link, Navigate } from "react-router-dom";
import { Input } from "../../fixed-component/Input";
import { useForm } from "react-hook-form";
import { authFnc } from "../AuthProvider";
export default function Login() {
  const { formState, register, handleSubmit } = useForm();
  const { errors } = formState;
  const signFnc = authFnc();
  function submit(e) {
    // signUp()
    signFnc.login(e.sign_email, e.sign_password);
  }
  if (authFnc().logined) {
    return <Navigate to={"/profile"} replace={true} />;
  }
  return (
    <div className="login sign-up">
      <div className="lap:flex gap-6 ">
        <div className="left hidden lap:block lap:w-2/5"></div>
        <form
          className="right lap:w-3/5"
          noValidate
          onSubmit={handleSubmit(submit)}
        >
          <div className="container mx-auto">
            <div className="logo">
              <Link to="/">
                <img src="./logo.png" alt="logo" />
              </Link>
            </div>
            <h1>Welcome to E Trade</h1>
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
              <Input
                id={"sign_password"}
                type={"password"}
                e={"Password"}
                register={register}
                errors={errors}
                pattern={{
                  required: {
                    value: true,
                    message: "Please enter your password",
                  },
                }}
              />
              <Link to="/reset_password" className="reset-link">
                Forgot password?
              </Link>
              <button>Log in</button>
              <p className="error">{signFnc?.loginError}</p>
            </div>
          </div>
        </form>
      </div>{" "}
    </div>
  );
}
