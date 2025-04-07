import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { AlertCircle, FileImage, Loader2, Upload } from "lucide-react";
import Navbar from "./Navbar";



const Form = () => {

  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [public_id, setPublic_id] = useState("");
  const [content, setContent] = useState("");
  // const [date,setDate] = useState("");
  const [doctor, setDoctor] = useState("")
  const [fileName, setFileName] = useState(null);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFile = async (event) => {

    setLoading(true);
    const file = event.target.files[0];
    if (!file) return;
    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "women-health-project");
    formData.append("cloud_name", "dixpqopet");

    const res = await fetch("https://api.cloudinary.com/v1_1/dixpqopet/image/upload", {
      method: "POST",
      body: formData
    })

    const uploadImage = await res.json();
    // console.log(uploadImage); //public_id //secure_url

    setImage(uploadImage.secure_url);
    setPublic_id(uploadImage.public_id);
    setLoading(false);

  }

  const onSubmit = async () => {
    setLoading(true);
    // console.log(title,content,image,doctor,public_id);

    const { data } = await axiosInstance.post("/article/add", {
      title,
      content,
      image,
      doctorName: doctor,
      public_id,
      userId: authUser._id
    })

    console.log(data);

    // const result = await res.json();
    // console.log(result);
    setLoading(false);
    // navigate(0);
    navigate('/articles')

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
        style={{ backgroundImage: `url('/bg/bg2.webp')` }}
      ></div>

      <Navbar/>

      <div className="flex justify-center items-center h-screen relative mx-3 sm:mx-0 top-10 sm:top-10 pt-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#f542b0] text-black p-4 sm:p-8 rounded-lg shadow-lg w-80 sm:w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Post Your Article
          </h2>

          {/* Full Name Field */}
          <div className="mb-1">
            <label className="block text-gray-700">Disease Name</label>
            <input
              type="text"
              {...register("disease", { required: "Disease Name is required" })}
              className="w-full p-2 border border-gray-300 rounded mt-1 bg-purple-200"
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>


          {/* Doctor name */}
          <div className="mb-1">
            <label className="block text-gray-700">Doctor Name</label>
            <input
              type="text"
              {...register("doctor", { required: "Name is required" })}
              className="w-full p-2 border border-gray-300 rounded mt-1 bg-purple-200"
              onChange={(e) => setDoctor(e.target.value)}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>


          {/* content */}
          <div className="mb-1">
            <label className="block text-gray-700">Content</label>
            <textarea
              {...register("content", { required: "Content should be given" })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              onChange={(e) => setContent(e.target.value)}
            />
            {errors.bio && (
              <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
            )}
          </div>


          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-purple-50 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-100 transition" >
              <input
                type="file"
                {...register("Image")}
                className="hidden"
                onChange={handleFile}
                id="fileUpload"
              />
              <label htmlFor="fileUpload" className="flex flex-col items-center cursor-pointer">
                <Upload className="w-10 h-10 text-purple-600" />
                <span className="text-sm text-gray-600 mt-2">Click to upload or drag and drop</span>
                {fileName && (
                  <div className="flex items-center mt-2 gap-2">
                    <FileImage className="w-5 h-5 text-gray-800" />
                    <p className="text-sm text-gray-800 font-medium">{fileName}</p>
                  </div>
                )}
              </label>
            </div>
            {errors.Image && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {errors.Image.message}
              </p>
            )}
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            disabled={loading}
          >
            Upload
          </button>
          {/* <p className="text-center text-gray-600 mt-4">Already have an account? <a href="/login" className="text-blue-700 hover:underline">Log in</a></p> */}
        </form>
      </div>
    </>
  );
};

export default Form;
