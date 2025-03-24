import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";

import { axiosInstance } from "../lib/axios.js";

const LogIn = () => {


  const { login, isLoggingIn } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [isLoading, setLoading] = useState(false);

  //const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    // try {
    //   setLoading(true);
    //   console.log(email, password,);

    //   const { data } = await axiosInstance.post('/auth/login', {
    //     email,
    //     password,
    //   });

    //   console.log(data);
    //   //login({ email, password });

    //   setLoading(false);
    //   navigate('/');

    // } catch (error) {
    //   console.log(error);
    //   setLoading(false);
    // }
    const data = { email, password };
    login(data);

  };

  return (

    <>
      {isLoggingIn && (
        <div className="absolute inset-0 w-full h-full bg-black opacity-30 z-50">
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin text-sky-600" />
          </div>
        </div>
      )}

      {/* Background Image with Opacity */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url('/backgroundSignUp.jpg')` }}
      ></div>

      <div className="flex justify-center items-center h-screen relative mx-3 sm:mx-0 top-10 pt-10 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-purple-500 text-black p-4 sm:p-8 rounded-lg shadow-lg w-80 sm:w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Log In
          </h2>



          {/* Email Field */}
          <div className="mb-1">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded mt-1 bg-purple-200"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-1">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded mt-1 bg-purple-100"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white mt-5 p-2 rounded hover:bg-blue-600 transition"
            disabled={isLoggingIn}
          >
            Log In
          </button>
          <p className="text-center text-gray-600 mt-4">If you have no account? <a href="/signup" className="text-blue-700 hover:underline">Sign Up</a></p>
        </form>
      </div>
    </>
  );
};

export default LogIn;