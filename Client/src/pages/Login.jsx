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
        _id: session.data._id,
        fullName: session.data.fullName,
        email: session.data.email,
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
  const handleEmailSubmit=()=>{
    navigate('/verifyotp')
  }
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-brand-50/70 to-white">
        <main className="container mx-auto flex flex-grow flex-col-reverse lg:flex-row items-center gap-12 py-16 p-4">
          {/* Left Section: Testimonials (shows below form on small screens) */}
          <div className="lg:w-1/2 lg:pr-8 lg:block">
            <h2 className="font-display text-2xl lg:text-3xl font-semibold text-ink-900 mb-4 text-center lg:text-left">
              What students say
            </h2>
            <p className="text-ink-500 text-base mb-6 leading-relaxed text-center lg:text-left">
              Real feedback from learners who found their groove with LearnLink's collaborative classrooms.
            </p>
            <div className="bg-white shadow-card p-6 rounded-2xl border border-ink-100">
              <p className="text-ink-700 text-base mb-4 text-center lg:text-left">
                "The web design course provided a solid foundation for me. The
                instructors were knowledgeable and supportive, and the
                interactive learning environment was engaging."
              </p>
              <div className="flex items-center justify-center lg:justify-start">
                <div className="w-10 h-10 bg-brand-200 text-brand-700 font-semibold rounded-full mr-3 flex items-center justify-center">
                  S
                </div>
                <span className="font-semibold text-lg text-ink-800">
                  Sarah L.
                </span>
              </div>
            </div>
          </div>

          {/* Right Section: Login Form */}
          <div className="w-full lg:w-1/2 bg-white shadow-card p-8 md:p-10 rounded-2xl border border-ink-100">
            <h2 className="font-display text-3xl font-semibold text-ink-900 mb-2 text-center">
              Welcome back
            </h2>
            <p className="text-ink-500 mb-8 text-center">
              Log in to pick up right where you left off.
            </p>
            <form className="space-y-5" onSubmit={handleSubmit(login)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-ink-700 mb-1.5"
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
                  className="block text-sm font-medium text-ink-700 mb-1.5"
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
                  <label htmlFor="remember" className="ml-2 text-ink-600">
                    Remember Me
                  </label>
                </div>

                <a
                  onClick={() => setDialogOpen(true)}
                  className="ml-auto text-brand-600 hover:underline cursor-pointer"
                >
                  Forgot Password?
                </a>

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger />
                  <DialogContent>
                    <DialogTitle>Enter your registered email</DialogTitle>
                    <DialogDescription className="italic">
                      Kindly enter valid email address
                    </DialogDescription>
                    <form onSubmit={handleEmailSubmit}>
                    <span  className="font-semibold text-ink-800 ">Email:</span>
                    <Input
                      id="email"
                      name="email"
                      placeholder="Enter valid email"
                      type="email"
                      required
                    />
                     <DialogFooter>
                    <Button className="mt-4" >Send Otp</Button>

                  </DialogFooter>
                  </form>
                  </DialogContent>

                </Dialog>
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full"
              >
                Login
              </Button>
              {error && (
                <p className="text-red-600 mt-4 text-center">{error}</p>
              )}
              <div className="flex items-center gap-3 text-ink-400 text-xs uppercase tracking-wide">
                <span className="h-px flex-1 bg-ink-100" />
                or
                <span className="h-px flex-1 bg-ink-100" />
              </div>
              <Button variant="outline" size="lg" className="w-full">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  {/* Google logo path */}
                </svg>
                Login with Google
              </Button>
              <p className="text-center text-sm text-ink-500 mt-4">
                Don't have an account?{" "}
                <Link
                  to={"/signup"}
                  className="text-brand-600 font-medium hover:underline"
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
