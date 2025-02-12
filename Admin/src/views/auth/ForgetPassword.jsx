import InputField from "components/fields/InputField";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogin } from "redux/Actions/ProfileActions";
export default function ForgetPassword() {
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.removeItem("token");
    dispatch(adminLogin(""));
  });

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:items-center md:justify-end md:px-0 lg:mb-10 lg:items-center lg:justify-end">
      {/* Sign in section */}
      <div className="mt-[2vh] w-full max-w-full flex-col items-center md:pl-4  lg:max-w-[420px] lg:pl-0">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Forget Password
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email to change your password
        </p>
        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@simmmple.com"
          id="email"
          type="text"
        />

        <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Send Reset Email
        </button>
        <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Want to try again?
          </span>
          <Link
            to="/auth/sign-in"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
