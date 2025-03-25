import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { axiosInstance } from '../lib/axios.js';
import { useNavigate } from "react-router-dom";




const ProfileUpdate = () => {

    const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

    const [fullName, setFullName] = useState(authUser.fullName);
    const [email, setEmail] = useState(authUser.email);
    // const [password, setPassword] = useState();
    const [age, setAge] = useState(authUser.age);
    const [profession, setProfession] = useState(authUser.profession);
    const [bio, setBio] = useState(authUser.bio);
    const [loading,setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    // console.log("---------------->",authUser._id,fullName,email,age,profession,bio);

    const onSubmit = async () => {
        console.log("--->",fullName,email,age,profession,bio);
        try {
            setLoading(true);
            const { data } = await axiosInstance.post('/auth/updateProfle', {
                userId: authUser._id,
                fullName,
                email,
                age,
                profession,
                bio
            })
    
            console.log(data);
            setLoading(false);
            navigate('/');

        } catch (error) {
            console.log(error)
        }

    }


  return (
    <>
      {loading && (
        <div className="absolute inset-0 w-full h-full bg-black opacity-30 z-50">
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin text-sky-600" />
          </div>
        </div>
      )}

      {/* Background Image with Opacity */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url('/background 1.webp')` }}
      ></div>

      <div className="flex justify-center items-center h-screen relative mx-3 sm:mx-0 top-10 pt-10 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#f542b0] text-black p-4 sm:p-8 rounded-lg shadow-lg w-80 sm:w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Upadate Profile
          </h2>

          {/* Full Name Field */}
          <div className="mb-1">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              {...register("fullName", { required: "Full Name is required" })}
              className="w-full p-2 border border-gray-300 rounded mt-1 bg-purple-200"
              placeholder={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

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
              placeholder={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>


          {/* Age Field */}
          <div className="mb-1">
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              {...register("age", {
                required: "Age is required",
                min: { value: 0, message: "Give a valid age" },
              })}
              className="w-full p-2 border border-gray-300 rounded mt-1 bg-purple-100"
              placeholder={age}
              onChange={(e) => setAge(e.target.value)}
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>

          {/* Profession Field */}
          <div className="mb-1">
            <label className="block text-gray-700">Profession</label>
            <input
              type="text"
              {...register("profession")}
              className="w-full p-2 border border-gray-300 rounded mt-1 bg-purple-50"
              placeholder={profession}
              onChange={(e) => setProfession(e.target.value)}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Bio Field */}
          <div className="mb-1">
            <label className="block text-gray-700">Bio</label>
            <textarea
              {...register("bio")}
              className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            {errors.bio && (
              <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            disabled={loading}
          >
            Update Profile
          </button>
          {/* <p className="text-center text-gray-600 mt-4">Already have an account? <a href="/login" className="text-blue-700 hover:underline">Log in</a></p> */}
        </form>
      </div>
    </>
  )
}

export default ProfileUpdate
