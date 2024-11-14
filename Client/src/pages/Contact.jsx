'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Linkedin, MapPin, Phone, Send, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-8 items-start"
        >
          <div>
            <h1 className="text-4xl font-bold mb-6 text-[#FF9500]">Contact Us</h1>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="fullname" className="text-sm font-medium">
                      First Name
                    </label>
                    <Input id="fullname" placeholder="Enter Full Name" required />
                  </div>
                  
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" placeholder="Enter your Email" type="email" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                  <Input id="phone" placeholder="Enter Phone Number" type="tel" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input id="subject" placeholder="Enter your Subject" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea id="message" placeholder="Enter your Message here..." required />
                </div>
                <Button className="w-full bg-[#FF9500] hover:bg-[#E68600] text-white">
                  <Send className="mr-2 h-4 w-4" /> Send Your Message
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Thank you!</strong>
                <span className="block sm:inline"> Your message has been sent successfully.</span>
              </motion.div>
            )}
          </div>
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#FF9500] to-[#2c5d41] p-6 rounded-lg text-white shadow-lg"
            >
              <h2 className="text-2xl font-semibold mb-4">Welcome to LearnLink's Contact Page</h2>
              <p>
                We're here to assist you with any questions or feedback regarding our educational notes and resources
                sharing platform. Whether you're a student looking for study materials or an educator wanting to share your
                knowledge, we're excited to hear from you.
              </p>
            </motion.div>
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow"
              >
                <MapPin className="text-[#FF9500]" />
                <span>Pokhara,Nepal</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow"
              >
                <Phone className="text-[#FF9500]" />
                <span>+061-57846</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow"
              >
                <svg
                  className="text-[#FF9500]"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect height="16" rx="2" width="20" x="2" y="4" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>support@learnlink.com</span>
              </motion.div>
            </div>
            <div className="flex space-x-4 justify-center">
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-[#FF9500] hover:text-[#E68600]">
                <Facebook size={24} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-[#FF9500] hover:text-[#E68600]">
                <Twitter size={24} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-[#FF9500] hover:text-[#E68600]">
                <Linkedin size={24} />
              </motion.a>
            </div>
            <div className="mt-8">
              <img
                src="https://img.freepik.com/free-photo/education-learning-puzzle-pieces-graphic_53876-120600.jpg?t=st=1729569111~exp=1729572711~hmac=a7dcf8d008e4bf2aa575eb2ed3cb0fd3a18e07800b10647b2e1650678a727386&w=1060"
                alt="LearnLink Community"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Contact;
