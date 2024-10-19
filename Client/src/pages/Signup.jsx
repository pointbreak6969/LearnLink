import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Signup = () => {
    const [isagreed, Setisagreed] = useState(false);

    const handleAggrement = () => {
        Setisagreed(!isagreed);
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (isagreed) {
            console.log('Signed Up!');
        }
    };

    return (
        <>
        <Navbar/>
        <div className="min-h-screen flex flex-col md:flex-row justify-center items-center bg-gray-100 p-4 space-y-8 md:space-y-0">
            {/* Student Testimonials Section */}
            <div className="bg-gray-100 flex flex-col max-w-7xl w-full md:w-1/2 p-8 mb-8 md:mr-20">
                <h2 className="text-3xl font-bold mb-6 text-center md:text-left">Students Testimonials</h2>
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
                    <button className="p-4 bg-orange-300 rounded-full shadow hover:bg-orange-400">
                        &#8592;
                    </button>
                    <button className="p-4 bg-orange-300 rounded-full shadow hover:bg-orange-400">
                        &#8594;
                    </button>
                </div>
            </div>

            {/* Signup Form Section */}
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 border border-gray-200">
                <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
                <p className="text-gray-600 mb-8 text-center">
                    Create an account to unlock exclusive features.
                </p>
                <form className="space-y-6" onSubmit={handleSignup}>
                    <div>
                        <label className="block text-gray-700 text-lg">Full Name</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400"
                            placeholder="Enter your Name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-lg">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400"
                            placeholder="Enter your Email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-lg">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400"
                            placeholder="Enter your Password"
                        />
                    </div>
                    <div className="flex items-center">
                        <input 
                            type="checkbox" 
                            className="mr-2" 
                            checked={isagreed} 
                            onChange={handleAggrement} 
                        />
                        <label className="text-gray-700 text-lg">
                            I agree with{' '}
                            <a href="#" className="text-orange-500">
                                Terms of Use
                            </a>{' '}
                            and{' '}
                            <a href="#" className="text-orange-500">
                                Privacy Policy
                            </a>
                        </label>
                    </div>
                    <button 
                        type="submit" 
                        className={`w-full p-3 rounded-md text-white transition duration-300 ${isagreed ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-400 cursor-not-allowed'}`} 
                        disabled={!isagreed}
                    >
                        Sign Up
                    </button>
                    <div className="flex items-center justify-between">
                        <hr className="w-full border-gray-300" />
                        <span className="px-2 text-gray-500">OR</span>
                        <hr className="w-full border-gray-300" />
                    </div>
                    <button className="w-full flex items-center justify-center p-3 border border-gray-300 rounded-md">
                        <img
                            src="https://imagepng.org/wp-content/uploads/2019/08/google-icon.png"
                            alt="Google"
                            className="w-6 h-6 mr-2"
                        />
                        Sign Up with Google
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-8">
                    Already have an account?{' '}
                    <Link to={'/login'} className="text-orange-500">
                        Login
                    </Link>
                </p>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default Signup;
