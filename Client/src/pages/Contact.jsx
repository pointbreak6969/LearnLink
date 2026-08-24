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
      <div className="bg-gradient-to-b from-brand-50/60 to-white min-h-screen">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-8 items-start"
        >
          <div className="bg-white p-8 rounded-2xl shadow-card border border-ink-100">
            <h1 className="font-display text-3xl font-semibold mb-6 text-ink-900">Contact Us</h1>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="fullname" className="text-sm font-medium text-ink-700">
                      First Name
                    </label>
                    <Input id="fullname" placeholder="Enter Full Name" required />
                  </div>

                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-ink-700">Email</label>
                  <Input id="email" placeholder="Enter your Email" type="email" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-ink-700">Phone</label>
                  <Input id="phone" placeholder="Enter Phone Number" type="tel" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-ink-700">Subject</label>
                  <Input id="subject" placeholder="Enter your Subject" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-ink-700">Message</label>
                  <Textarea id="message" placeholder="Enter your Message here..." required />
                </div>
                <Button size="lg" className="w-full">
                  <Send className="mr-2 h-4 w-4" /> Send Your Message
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl relative"
                role="alert"
              >
                <strong className="font-semibold">Thank you!</strong>
                <span className="block sm:inline"> Your message has been sent successfully.</span>
              </motion.div>
            )}
          </div>
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-brand-500 to-brand-600 p-6 rounded-2xl text-white shadow-glow"
            >
              <h2 className="font-display text-2xl font-semibold mb-4">Welcome to LearnLink's Contact Page</h2>
              <p className="text-white/85">
                We're here to assist you with any questions or feedback regarding our educational notes and resources
                sharing platform. Whether you're a student looking for study materials or an educator wanting to share your
                knowledge, we're excited to hear from you.
              </p>
            </motion.div>
            <div className="space-y-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-3 bg-white p-3 rounded-xl shadow-card border border-ink-100"
              >
                <MapPin className="text-brand-500 h-5 w-5" />
                <span className="text-ink-700">Pokhara, Nepal</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-3 bg-white p-3 rounded-xl shadow-card border border-ink-100"
              >
                <Phone className="text-brand-500 h-5 w-5" />
                <span className="text-ink-700">+061-57846</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-3 bg-white p-3 rounded-xl shadow-card border border-ink-100"
              >
                <svg
                  className="text-brand-500 h-5 w-5"
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
                <span className="text-ink-700">support@learnlink.com</span>
              </motion.div>
            </div>
            <div className="flex space-x-4 justify-center">
              <motion.a whileHover={{ scale: 1.15 }} href="#" className="text-ink-400 hover:text-brand-600">
                <Facebook size={22} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.15 }} href="#" className="text-ink-400 hover:text-brand-600">
                <Twitter size={22} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.15 }} href="#" className="text-ink-400 hover:text-brand-600">
                <Linkedin size={22} />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </>
  );
};

export default Contact;
