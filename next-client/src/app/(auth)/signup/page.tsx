"use client"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import authService from "@/services/auth";
import { useRouter } from "next/navigation";
import { signupSchema } from "../../../../schemas/signupSchema";
import * as z from "zod";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const queryClient = new QueryClient();
export default function page() {
    const router = useRouter();
    const {register, formState: {errors}, handleSubmit, reset } = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            termsAgreed: false,
        }
    })
    const signupMutation = useMutation({
        mutationFn: ({fullName, email, password}: {fullName: string, email: string, password: string}) => authService.signup({fullName, email, password}),
        onSuccess: (userData) =>{
            queryClient.setQueryData(["currentUser"], userData)            
            reset();
            toast.success("Signup successful");
            router.push("/")
        }, 
        onError: ()=>{
            toast.error("Signup failed");
        }
    })
    const onSubmit = (data: z.infer<typeof signupSchema>) => {
        signupMutation.mutate(data);
    }
      return (
    <>
      <div className="min-h-screen flex flex-col-reverse md:flex-row justify-center items-center bg-gray-100 p-4 space-y-8 md:space-y-0">
        {/* Student Testimonials Section */}
        <div className="bg-gray-100 flex flex-col max-w-7xl w-full lg:w-1/2 p-8 mb-8 lg:mr-20">
          <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
            Students Testimonials
          </h2>
          <p className="text-gray-600 mb-8 text-center md:text-left">
            Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget
            elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum
            eget habitasse in velit fringilla feugiat senectus in.
          </p>
          <div className="bg-orange-100 p-8 rounded-md shadow-md mb-6">
            <p className="text-gray-800 mb-4 text-lg">
              "The web design course provided a solid foundation for me. The
              instructors were knowledgeable and supportive, and the interactive
              learning environment was engaging. I highly recommend it!"
            </p>
            <div className="flex items-center">
              <img
                src="https://img.freepik.com/free-photo/young-bearded-man-black-shirt-looking-camera-surprised_141793-28376.jpg?t=st=1729246925~exp=1729250525~hmac=dfa04fb66540039872c4a3349874cae70cd1c972e93cefd57a059ffa50f09eeb&w=900"
                alt="Student"
                className="w-16 h-16 rounded-full"
              />
              <div className="ml-4">
                <p className="font-bold text-gray-700 text-lg">Sarah L.</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <Button className="p-4 bg-orange-300 rounded-full shadow hover:bg-orange-400">
              &#8592;
            </Button>
            <Button className="p-4 bg-orange-300 rounded-full shadow hover:bg-orange-400">
              &#8594;
            </Button>
          </div>
        </div>

        {/* Signup Form Section */}
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
          <p className="text-gray-600 mb-8 text-center">
            Create an account to unlock exclusive features.
          </p>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-gray-700 text-lg">Full Name</label>
              <Input
                type="text"
                className="w-full"
                placeholder="Enter your Name"
                {...register("fullName", { required: true })}
              />
              {errors.fullName && (
                <p className="text-red-600 mt-2">{errors.fullName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-lg">Email</label>
              <Input
                type="email"
                className="w-full"
                placeholder="Enter your Email"
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
                {errors.email && (
                    <p className="text-red-600 mt-2">{errors.email.message}</p>
                )}
            </div>
            <div>
              <label className="block text-gray-700 text-lg">Password</label>
              <Input
                type="password"
                className="w-full"
                placeholder="Enter your Password"
                {...register("password", { required: true })}
              />
                {errors.password && (
                    <p className="text-red-600 mt-2">{errors.password.message}</p>
                )}
            </div>
            <div className="flex items-center space-x-3">
              <Input
                type="checkbox"
                id="terms"
                {...register("termsAgreed", { required: true })}
                defaultChecked={false}
                className="w-4 h-4"
              />
              <label htmlFor="terms" className="text-gray-700 text-sm">
                I agree with{" "}
                <Link href="#" className="text-orange-500 hover:underline">
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-orange-500 hover:underline">
                  Privacy Policy
                </Link>
              </label>
                {errors.termsAgreed && (
                    <p className="text-red-600 mt-2">{errors.termsAgreed.message}</p>
                )}
            </div>
            <Button
              type="submit"
              className="w-full bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
            >
              Sign Up
            </Button>
            {/* {error && <p className="text-red-600 mt-4 text-center">{error}</p>} */}
            <div className="flex items-center justify-between">
              <hr className="w-full border-gray-300" />
              <span className="px-2 text-gray-500">OR</span>
              <hr className="w-full border-gray-300" />
            </div>
            <Button
              className="w-full flex items-center justify-center"
            
            >
              <img
                src="https://imagepng.org/wp-content/uploads/2019/08/google-icon.png"
                alt="Google"
                className="w-6 h-6 mr-2"
              />
              Sign Up with Google
            </Button>
          </form>
          <p className="text-center text-gray-600 mt-8">
            Already have an account?{" "}
            <Link href={"/login"} className="text-orange-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
