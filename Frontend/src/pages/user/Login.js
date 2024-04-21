import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { userApi } from "../../api/userApi";
import { AuthContext } from "../../context/AuthContext";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Loading from "../../assets/loading.gif";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const loginUser = async (data) => {
    setIsLoading(true);
    try {
      const response = await userApi.loginUser({
        ...data,
      });
      login(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };
  const signUpUser = async (data) => {
    setIsLoading(true);
    try {
      const response = await userApi.registerUser({
        ...data,
      });
      login(response.data);
      toast.success("User registered successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  const onSubmit = (data) => {
    delete data.confirmPassword;
    if (isLogin) loginUser(data);
    else signUpUser(data);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-widest font-sans text-white">Spendwise</h1>
            <p className="text-lg font-sans tracking-wider text-gray-300 mt-2">An app just like it sounds!!</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {isLogin ? (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="block w-full px-3 py-2 mt-1 text-black bg-white border rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  />
                  {errors.email && <p className="text-red-500 text-xs font-semibold">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <input
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                    })}
                    type="password"
                    autoComplete="current-password"
                    className="block w-full px-3 py-2 mt-1 text-black bg-white border rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  />
                  {errors.password && <p className="text-red-500 text-xs font-semibold">{errors.password.message}</p>}
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="block w-full px-3 py-2 mt-1 text-black bg-white border rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  />
                  {errors.name && <p className="text-red-500 text-xs font-semibold">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email address
                  </label>
                  <input
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    autoComplete="email"
                    className="block w-full px-3 py-2 mt-1 text-black bg-white border rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  />
                  {errors.email && <p className="text-red-500 text-xs font-semibold">{errors.email.message}</p>}
                </div>

                <div className="relative">
                  <input
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="block w-full px-3 py-2 mt-1 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  />
                  <button onClick={() => setShowPassword(!showPassword)} type="button" className=" inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M16 8s-3 5.5-8 5.5S0 8 0 8s3-5.5 8-5.5S16 8 16 8zm-8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l1.61 1.61A3.5 3.5 0 0 1 8 10.5c.747 0 1.444-.242 2.016-.675l3.343 3.343A7 7 0 0 0 16 8zM1.64 2.936l2.062 2.062A3.5 3.5 0 0 0 8 3.5c.747 0 1.444.242 2.016.675l1.614 1.614A3.5 3.5 0 0 1 8 9.5a3.5 3.5 0 0 1-2.016-.675l-3.343-3.343A7 7 0 0 0 0 8c0 0 3 5.5 8 5.5a7 7 0 0 0 2.79-.588L1.64 2.936zM5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829z" />
                        <path d="M13.82 12.062 12 10.242 14.062 8 12 5.757l2-2L16 5.8z" />
                        <path d="M11.1 9.1l1.4 1.4c.045-.139.07-.29.07-.45a1.5 1.5 0 1 0-1.47 1.05z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs font-semibold">{errors.password.message}</p>}
              </>
            )}

            <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
              {isLogin ? "Sign in" : "Sign up"}
            </button>
          </form>
          <div className="text-center text-sm font-medium text-gray-300">
            {isLoading && (
              <div className="flex justify-center items-center">
                <img src={Loading} className="w-12" alt="Loading" />
              </div>
            )}
            {isLogin ? (
              <>
                Don't have an account?
                <button onClick={() => setIsLogin(false)} className="text-yellow-600 hover:text-yellow-500 ml-1">
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?
                <button onClick={() => setIsLogin(true)} className="text-yellow-600 hover:text-yellow-500 ml-1">
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
