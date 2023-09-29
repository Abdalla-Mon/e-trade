import { Link, Navigate } from "react-router-dom";
import { Input } from "../../fixed-component/Input";
import { useForm } from "react-hook-form";
import { authFnc } from "../AuthProvider";

export default function SignUp() {
  const { formState, register, handleSubmit } = useForm();
  const { errors } = formState;
  const signFnc = authFnc();
  function submit(e) {
    signFnc.signUp(e.sign_email, e.sign_password, e.sign_userName);
  }
  if (authFnc().logined) {
    return <Navigate to={"/profile"} replace={true} />;
  }
  return (
    <div className="sign-up">
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
              Already signed up? <Link to="/login">Log in</Link>
            </h4>
            <div className="form-flex flex flex-col gap-6">
              <Input
                id={"sign_userName"}
                type={"text"}
                e={"User Name"}
                register={register}
                errors={errors}
                pattern={{
                  required: {
                    value: true,
                    message: "Please enter a user name",
                  },
                }}
              />
              <Input
                id={"sign_email"}
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
              <Input
                id={"sign_password"}
                type={"password"}
                e={"Password"}
                register={register}
                errors={errors}
                pattern={{
                  required: {
                    value: true,
                    message: "Please enter a password",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/g,
                    message:
                      "Your password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number.                    ",
                  },
                }}
              />
              <button>Sign Up</button>
              <p className="error">{signFnc?.signupError}</p>
              {/* {signFnc?.signupError?.slice(22, signFnc.signupError.length - 2)} */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
