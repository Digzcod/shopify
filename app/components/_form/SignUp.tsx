"use client";
import React from "react";
import Image from "next/image";
import brandLogo from "../../../public/home-img/logo.png";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { signUpAction } from "@/app/(auth)/sign-up/action";

// Define the shape of the form values
interface FormValues {
  gender: string;
  username: string;
  fullName: string;
  email: string;
  password: string;
}

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const initialValues: FormValues = {
    gender: "",
    username: "",
    fullName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    gender: Yup.string().required("Gender is required"),
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    fullName: Yup.string()
      .min(3, "Fullname must be at least 3 characters")
      .required("Full Name is required"),
    email: Yup.string().email("Must be a valid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,    
    onSubmit: async (values) => {
      console.log(values)
      try {
        const result = await signUpAction(values.gender, values.username, values.fullName, values.email, values.password);
        
        if (result.status === 200) {
          console.log("SignUp successful:", result);
          router.push("/user");
          router.refresh();
        } else {
          console.error("SignUp error:", result.message);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    },   
  });

  return (
    <div className="w-full mx-auto mt-[8rem]">
      <form
        className="w-full sm:w-[480px] rounded-lg shadow-md px-[2rem] space-y-3 border-2 pb-[2rem]"
        onSubmit={formik.handleSubmit}
      >
        <div className="grid justify-items-center my-3 mt-[3rem] mx-auto px-auto">
          <Image src={brandLogo} alt="logo" className="w-[2.5rem]" />
          <h2 className="text-2xl font-bold">Sign Up</h2>
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formik.values.gender === "male"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="radio radio-accent"
            />
            <span className="ml-2 text-lg font-medium">Male</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formik.values.gender === "female"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="radio radio-accent"
            />
            <span className="ml-2 text-lg font-medium">Female</span>
          </label>
        </div>

        {formik.touched.gender && formik.errors.gender ? (
          <div className="text-red-600">{formik.errors.gender}</div>
        ) : null}

        <div>
          <label className="block text-xl font-medium ">Username</label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full mt-2 px-4 py-3 border rounded-md checkbox-accent text-lg font-medium  "
            required
          />
        </div>

        {formik.touched.username && formik.errors.username ? (
          <div className="text-red-600 text-lg font-medium mt-1 ">{formik.errors.username}</div>
        ) : null}

        <div>
          <label className="block text-xl font-medium ">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full mt-2 px-4 py-3 border rounded-md checkbox-accent text-lg font-medium"
            required
          />
        </div>

        {formik.touched.fullName && formik.errors.fullName ? (
          <div className="text-red-600 text-lg font-medium py-3 px-3 rounded">{formik.errors.fullName}</div>
        ) : null}

        <div>
          <label className="block text-xl font-medium ">Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full mt-2 px-4 py-3 border rounded-md checkbox-accent text-lg font-medium"
            required
          />
        </div>

        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-600 text-lg font-medium py-3 px-3">{formik.errors.email}</div>
        ) : null}

        <div>
          <label className="block text-xl font-medium ">Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="checkbox-accent w-full mt-2 px-4 py-3 border rounded-md text-lg font-medium"
            required
          />
        </div>

        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-600 text-lg font-medium py-3 px-3 ">{formik.errors.password}</div>
        ) : null}

        <button
          type="submit"
          className="w-full py-3 px-4 bg-accent text-white text-lg font-semibold rounded-md"
        >
          Sign Up
        </button>
        <Link href="/sign-in" className="my-[2rem]">
          <div className="mb-5 mt-[1rem] text-xl font-medium">
            <h1>Already have an account? Please sign in?</h1>
          </div>
        </Link>
      </form>
    </div>
  );
};

export default SignUpForm;
