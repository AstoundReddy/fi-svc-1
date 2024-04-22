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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
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
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="block w-full px-3 py-2 mt-1 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  />
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
