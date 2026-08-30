import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "@/services/auth";
import { login } from "@/store/authSlice";
const Signup = () => {
  const [isagreed, Setisagreed] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const create = async (data) => {
    setError("")
    if (!isagreed) {
      setError("You must accept the terms of service");
      return;
    }
    try {
      const createdUser = await authService.createUser(data);
      const userData = {
        _id: createdUser.data._id,
        fullName: createdUser.data.fullName,
        email: createdUser.data.email,
        role: createdUser.data.role,
      };
      if (createdUser) {
        dispatch(login(userData));

        if (createdUser.data.role === "superadmin") {
          navigate("/admin");
        } else {
          navigate("/classroom");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div className="min-h-screen flex flex-col-reverse md:flex-row justify-center items-center gap-12 bg-gradient-to-b from-brand-50/70 to-white p-4 py-16">
        {/* Student Testimonials Section */}
        <div className="flex flex-col max-w-lg w-full lg:w-1/2">
          <h2 className="font-display text-3xl font-semibold mb-4 text-center md:text-left text-ink-900">
            Students Testimonials
          </h2>
          <p className="text-ink-500 mb-8 text-center md:text-left">
            Join a community of learners already growing their skills together on LearnLink.
          </p>
          <div className="bg-white p-8 rounded-2xl shadow-card border border-ink-100">
            <p className="text-ink-700 mb-4 text-lg">
              &quot;The web design course provided a solid foundation for me. The
              instructors were knowledgeable and supportive, and the interactive
              learning environment was engaging. I highly recommend it!&quot;
            </p>
            <div className="flex items-center">
              <div className="w-14 h-14 rounded-full bg-brand-200 text-brand-700 font-semibold text-lg flex items-center justify-center">
                S
              </div>
              <div className="ml-4">
                <p className="font-semibold text-ink-800 text-lg">Sarah L.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Signup Form Section */}
        <div className="bg-white shadow-card rounded-2xl w-full max-w-md p-8 md:p-10 border border-ink-100">
          <h2 className="font-display text-3xl font-semibold mb-2 text-center text-ink-900">Create your account</h2>
          <p className="text-ink-500 mb-8 text-center">
            Sign up to unlock classrooms, resources, and more.
          </p>
          <form className="space-y-5" onSubmit={handleSubmit(create)}>
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Full Name</label>
              <Input
                type="text"
                className="w-full"
                placeholder="Enter your name"
                {...register("fullName", { required: true })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Email</label>
              <Input
                type="email"
                className="w-full"
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
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Password</label>
              <Input
                type="password"
                className="w-full"
                placeholder="At least 8 characters"
                {...register("password", { required: true, minLength: 8 })}
              />
            </div>
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                onChange={(e) => Setisagreed(e.target.checked)}
                className="mt-1 accent-brand-500"
              />
              <label htmlFor="terms" className="text-sm text-ink-600">
                I agree with{" "}
                <Link to="#" className="text-brand-600 hover:underline">
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link to="#" className="text-brand-600 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            <Button type="submit" size="lg" className="w-full">
              Sign Up
            </Button>
            {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
            <div className="flex items-center gap-3 text-ink-400 text-xs uppercase tracking-wide">
              <span className="h-px flex-1 bg-ink-100" />
              or
              <span className="h-px flex-1 bg-ink-100" />
            </div>
            <Button
              className="w-full flex items-center justify-center"
              variant="outline"
              size="lg"
            >
              <img
                src="https://imagepng.org/wp-content/uploads/2019/08/google-icon.png"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign Up with Google
            </Button>
          </form>
          <p className="text-center text-sm text-ink-500 mt-8">
            Already have an account?{" "}
            <Link to={"/login"} className="text-brand-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
