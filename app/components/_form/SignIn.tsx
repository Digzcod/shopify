"use client";
import React, { useState } from "react";
import brandLogo from "../../../public/home-img/logo.png";
import Image from "next/image";
import useNavbar from "@/app/hooks/_navbar/useNavbar";
import weStyled from "classnames";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { signInAction } from "@/app/(auth)/sign-in/action";

interface SignInFormValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const [remember, setRemember] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { darkMode, lightMode } = useNavbar();
  const router = useRouter();

  const initialValues: SignInFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters")
      .required("Passwor is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // console.log(values);
      try {
        const result = await signInAction(
          values.email,
          values.password,
          remember
        );
        if (result.status === 200) {
          console.log("SignIn successful", result);
          router.push("/user");
          router.refresh();
        } else {
          setErrorMessage(result?.message);
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        }
      } catch (error) {
        setErrorMessage("Unexpected error occurred. Please try again.");
        console.error("Unexpected error:", error);
        setTimeout(() => {
          setErrorMessage("");
        }, 8000);
      }
    },
  });

  return (
    <div className="w-[350px] sm:w-[450px] mt-[5rem] border px-5 sm:px-[2rem] py-5">
      <div className="flex gap-x-3 justify-start items-center mt-[2rem]">
        <Image src={brandLogo} alt="" className="w-[2.5rem]" />
        <h1 className="font-bold text-lg sm:text-3xl">Sign In</h1>
      </div>
      <form onSubmit={formik.handleSubmit} className="mb-[1rem]">
        <section className="grid w-full">
          {/* email */}
          <div className="grid mt-[2rem]">
            <label htmlFor="email" className="text-lg font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-2 py-3 text-md sm:text-lg border outline-none focus:outline-green-500 rounded"
              placeholder="email..."
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600 text-lg mt-2 font-medium">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          {/* password */}
          <div className="grid mt-[2rem]">
            <label htmlFor="password" className="text-lg font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-2 py-3 text-md sm:text-lg border outline-none focus:outline-green-500 rounded"
              placeholder="password..."
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-600 text-lg mt-2 font-medium">
                {formik.errors.password}
              </div>
            ) : null}
            {errorMessage && (
              <div className="my-2 px-4 py-3 rounded text-red-600 text-md font-medium mt-2 bg-red-500 bg-opacity-5">
                {errorMessage}
              </div>
            )}
          </div>

          {/* remember me */}
          <div className="flex items-center gap-x-2 my-3">
            <input
              type="checkbox"
              className="checkbox-primary checkbox-md"
              onClick={() => setRemember(!remember)}
            />
            <span className="text-lg font-medium">Remember Me</span>
          </div>
          {remember && (
            <div className="flex items-center bg-slate-100 gap-x-2 mb-2 px-4 py-2 border rounded-md">
              <AiOutlineExclamationCircle className="text-2xl" />
              <span className="text-lg rounded-md text-slate-600">
                Only select this on a private device.
              </span>
            </div>
          )}
          <button
            type="submit"
            className={weStyled(
              "my-3 px-5 py-3 border-2 text-xl text-white font-semibold rounded-md",
              {
                "bg-blue-400": darkMode,
                "bg-accent": lightMode,
              }
            )}
          >
            Sign In
          </button>
          <div className="grid mt-[1rem] text-md">
            <span>Forgot Password?</span>
            <Link href="/sign-up">
              <span className="hover:border-b-2 hover:border-b-blue-400">
                New Account?
              </span>
            </Link>
          </div>
        </section>
      </form>
    </div>
  );
};

export default SignIn;
