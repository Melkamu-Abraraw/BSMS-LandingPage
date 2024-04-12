"use client";
import React, { useState } from "react";
import * as yup from "yup";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaCamera } from "react-icons/fa";
import { loadProfile } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required("First Name is required")
      .matches(/^[A-Za-z]+$/, "First Name must contain only characters"),
    lastName: yup
      .string()
      .required("Last Name is required")
      .matches(/^[A-Za-z]+$/, "Last Name must contain only characters"),
    phoneNumber: yup
      .string()
      .required("Phone Number is required")
      .matches(/^9\d{8}$/, "Phone Number must start with 9 and 9 numbers long"),
    email: yup
      .string()
      .required("Email is required")
      .matches(emailRegex, "Invalid email format"),
    password: yup.string().required("Password is required").min(8),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Does Not Match")
      .required("Confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const showToastMessage = () => {
    toast.success("User is Successfully Registered!", {
      position: "top-right",
    });
  };

  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file); // Get URL of the selected file

    setImage(imageUrl); // Set the image URL in component state
    dispatch(loadProfile(imageUrl)); // Dispatch the image URL to Redux store
    setFile(file); // Set the file object in component state
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const imageUrl = useSelector(
    (state) => state.authForProfileImageReducer.value.url
  );
  const baseUrl = useSelector(
    (state) => state.authForProfileImageReducer.value.baseUrl
  );
  const handleChange = () => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (formData) => {
    const formDataToSend = new FormData();

    // Append each key-value pair from original formData
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        formDataToSend.append(key, formData[key]);
      }
    }

    // Append images with file as key-value pairs
    formDataToSend.append("images", file);
    try {
      const response = await fetch(
        `http://localhost:3001/api/User/userRegister`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data) {
        showToastMessage();
        setTimeout(() => {
          router.push("/login"); // Redirect to login page after a delay
        }, 3000); // Adjust the delay time as needed
      }
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="mx-auto my-auto mb-3" style={{ width: "45%" }}>
        <form
          className="grid grid-cols-1 gap-3 p-6 bg-white shadow-lg rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className=" mx-auto ">
            <h1 className="text-2xl font-semibold mx-auto mb-1 ml-1">
              Sign Up
            </h1>
            <label htmlFor="upload-input" className="relative mx-auto">
              <input
                id="upload-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
              <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer">
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded"
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <FaCamera className="text-gray-500 w-12 h-12" />
                )}
              </div>
            </label>
          </div>
          <span className="mx-auto mb-2"> Upload Profile Image</span>
          <div className="grid grid-cols-2 gap-6">
            <div className="w-full">
              <div className="mb-2">
                <Label htmlFor="firstName">First Name</Label>
              </div>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                {...register("firstName")}
              />
              <p className="p-1 text-red-600">{errors.firstName?.message}</p>
            </div>
            <div className="w-full">
              <div className="mb-2">
                <Label htmlFor="lastName">Last Name</Label>
              </div>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                {...register("lastName")}
              />
              <p className="p-1 text-red-600">{errors.lastName?.message}</p>
            </div>
            <div className="w-full">
              <div className="mb-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
              </div>
              <div className="flex">
                <Input
                  disabled
                  type="tel"
                  placeholder="+251"
                  className="w-16 font-bold  placeholder"
                />
                <Input
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  {...register("phoneNumber")}
                />
              </div>
              <p className="p-1 text-red-600">{errors.phoneNumber?.message}</p>
            </div>
            <div className="w-full">
              <div className="mb-2">
                <Label htmlFor="email">Email</Label>
              </div>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                {...register("email")}
              />
              <p className="p-1 text-red-600">{errors.email?.message}</p>
            </div>
            <div className="w-full">
              <div className="mb-2">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                {...register("password")}
              />
              <p className="p-1 text-red-600">{errors.password?.message}</p>
            </div>
            <div className="w-full">
              <div className="mb-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
              </div>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              <p className="p-1 text-red-600">
                {errors.confirmPassword?.message}
              </p>
            </div>
          </div>
          <Button type="submit" variant="login" className="w-full">
            Sign Up
          </Button>

          <p className="flex justify-center md:flex-col lg:flex-row ">
            Do have an account?
            <Link href="/login">
              <span className="font-bold ml-1 text-green"> Login</span>
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
