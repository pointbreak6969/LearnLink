import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Login = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="container mx-auto mt-8 flex flex-grow">
          {/* Left Section: Testimonials */}
          <div className="w-1/2 pr-8 hidden lg:block">
            <h2 className="text-3xl font-bold text-orange-600 mb-4">Students Testimonials</h2>
            <p className="text-gray-600 text-base mb-6 leading-relaxed">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempus
              tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem
              nibh et. Highly recommend it!"
            </p>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <p className="text-gray-700 text-base mb-4">
                "The web design course provided a solid foundation for me. The
                instructors were knowledgeable and supportive, and the interactive
                learning environment was engaging."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-400 rounded-full mr-3"></div>
                <span className="font-semibold text-lg text-gray-800">Sarah L.</span>
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-orange-500 hover:text-white transition duration-300">
                &lt;
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-orange-500 hover:text-white transition duration-300">
                &gt;
              </button>
            </div>
          </div>

          {/* Right Section: Login Form */}
          <div className="w-full lg:w-1/2 bg-white shadow-lg p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Login</h2>
            <p className="text-gray-600 mb-6 text-center">Welcome back! Please log in to access your account.</p>
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="h-4 w-4 text-orange-500" />
                  <label htmlFor="remember" className="ml-2 text-gray-600">Remember Me</label>
                </div>
                <a href="#" className="text-orange-600 hover:underline">Forgot Password?</a>
              </div>
              <button className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition duration-300">
                Login
              </button>
              <div className="text-center text-gray-500">OR</div>
              <button className="w-full border border-gray-300 flex items-center justify-center py-3 rounded-lg hover:bg-gray-50 transition duration-300">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Login with Google
              </button>
              <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account?{" "}
                <Link to={'/signup'} className="text-orange-500 hover:underline">Sign Up</Link>
              </p>
            </form>
          </div>
        </main>
      <Footer />
      </div>
    </>
  );
};

export default Login;
