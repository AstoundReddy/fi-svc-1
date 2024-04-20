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
      toast.error(error.response.data);
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
      <div className="flex bg-slate-300 items-center justify-center h-screen">
        <div className="bg-slate-600  min-w-96 p-10 rounded-lg">
          <div className="text-white">
            <form className="space-y-3">
              {isLogin && (
                <>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className="appearance-none text-black block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {errors.email && <p className="text-red-500 text-xs font-semibold font-sans">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium">
                      Password
                    </label>
                    <div className="mt-1">
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
                        className="appearance-none text-black block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {errors.password && <p className="text-red-500 text-xs font-semibold font-sans">{errors.password.message}</p>}
                    </div>
                  </div>
                </>
              )}
              {!isLogin && (
                <>
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium">Name</label>
                    <input
                      type="text"
                      {...register("name", { required: "First name is required" })}
                      className="px-2 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    />
                    {errors.name && <p className="text-red-500 text-xs font-semibold font-sans">{errors.name.message}</p>}
                  </div>

                  <div className="flex flex-col">
                    <label className="block text-sm font-medium">Email address</label>
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
                      className="px-2 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    />
                    {errors.email && <p className="text-red-500 text-xs font-semibold font-sans">{errors.email.message}</p>}
                  </div>

                  <div className="flex flex-col">
                    <label className="block text-sm font-medium">Password</label>
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
                      className="px-2 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    />
                    {errors.password && <p className="text-red-500 text-xs font-semibold font-sans">{errors.password.message}</p>}
                  </div>
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      {...register("confirmPassword", { required: "Confirm password is required", validate: (value) => value === password || "The passwords do not match" })}
                      type="password"
                      autoComplete="new-password"
                      className="px-2 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs font-semibold font-sans">{errors.confirmPassword.message}</p>}
                  </div>
                </>
              )}
            </form>
            <div className="mt-2 block text-sm font-medium ">
              {isLogin ? (
                <div>
                  Don't have an account?
                  <button onClick={() => setIsLogin(false)} className="text-indigo-600 mx-1 hover:text-indigo-500">
                    {" "}
                    Sign up
                  </button>
                </div>
              ) : (
                <div>
                  Already have an account?
                  <button onClick={() => setIsLogin(true)} className="text-indigo-600 mx-1 hover:text-indigo-500">
                    {" "}
                    Sign in
                  </button>
                </div>
              )}

              <div>
                {isLoading && (
                  <div className="flex justify-center items-center">
                    <img src={Loading} className="w-12" alt="Loading" />
                  </div>
                )}
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="w-full flex mt-2 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {isLogin ? "Sign in" : "Sign up"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    </>
  );
};

export default Login;
