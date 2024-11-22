import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../services/auth.js";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { login as authLogin } from "../store/authSlice";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      const userData = {
        _id: session.data.loggedInUser._id,
        fullName: session.data.loggedInUser.fullName,
        email: session.data.loggedInUser.email,
      };
      if (session?.data) {
        dispatch(authLogin(userData));

        navigate("/classroom");
      } else {
        setError("Invalid response from server");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="container mx-auto flex flex-grow flex-col-reverse lg:flex-row mt-8 p-4">
          {/* Left Section: Testimonials (shows below form on small screens) */}
          <div className="lg:w-1/2 lg:pr-8 lg:block mt-8 lg:mt-0">
            <h2 className="text-2xl lg:text-3xl font-bold text-orange-600 mb-4 text-center lg:text-left">
              Students Testimonials
            </h2>
            <p className="text-gray-600 text-base mb-6 leading-relaxed text-center lg:text-left">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempus
              tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim
              lorem nibh et. Highly recommend it!"
            </p>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <p className="text-gray-700 text-base mb-4 text-center lg:text-left">
                "The web design course provided a solid foundation for me. The
                instructors were knowledgeable and supportive, and the
                interactive learning environment was engaging."
              </p>
              <div className="flex items-center justify-center lg:justify-start">
                <div className="w-10 h-10 bg-purple-400 rounded-full mr-3"></div>
                <span className="font-semibold text-lg text-gray-800">
                  Sarah L.
                </span>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end mt-6 space-x-4">
              <Button
                variant="outline"
                className="w-10 h-10 flex items-center justify-center rounded-full"
              >
                &lt;
              </Button>
              <Button
                variant="outline"
                className="w-10 h-10 flex items-center justify-center rounded-full"
              >
                &gt;
              </Button>
            </div>
          </div>

          {/* Right Section: Login Form */}
          <div className="w-full lg:w-1/2 bg-white shadow-lg p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              Login
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Welcome back! Please log in to access your account.
            </p>
            <form className="space-y-6" onSubmit={handleSubmit(login)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: true,
                    validate: {
                      matchPatern: (value) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                          value
                        ) || "Email address must be a valid address",
                    },
                  })}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="ml-2 text-gray-600">
                    Remember Me
                  </label>
                </div>

                <button
                  onClick={() => setDialogOpen(true)}
                  className=" ml-auto text-orange-600 hover:underline"
                >
                  Forgot Password?
                </button>

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger />
                  <DialogContent>
                    <DialogTitle>Enter your registered email</DialogTitle>
                    <DialogDescription className="italic">
                      Kindly enter valid email address
                    </DialogDescription>
                    <span  className="font-semibold text-gray-800">Email:</span>
                    <Input
                      id="email"
                      name="email"
                      placeholder="Enter valid email"
                    />
                     <DialogFooter>
                    <Button className="rounded-xl">Send Otp</Button>
                  </DialogFooter>
                  </DialogContent>
                 
                </Dialog>
              </div>
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg"
              >
                Login
              </Button>
              {error && (
                <p className="text-red-600 mt-4 text-center">{error}</p>
              )}
              <div className="text-center text-gray-500">OR</div>
              <Button variant="outline" className="w-full py-3 rounded-lg">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  {/* Google logo path */}
                </svg>
                Login with Google
              </Button>
              <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account?{" "}
                <Link
                  to={"/signup"}
                  className="text-orange-500 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
