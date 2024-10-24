import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { classrooms, suggestedClassrooms } from "@/lib/list";
import CardCollection from "@/components/CardCollection";

const Classroom = () => {
  const [classCode, setClassCode] = useState("");
  const [error, setError] = useState("");
  const itemsToShow = 4;
  const autoScrollInterval = 3000;

  const extendedClassrooms = [...suggestedClassrooms, ...suggestedClassrooms];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex + 1) % Math.ceil(extendedClassrooms.length / itemsToShow)
      );
    }, autoScrollInterval);
    return () => clearInterval(interval);
  }, []);

  const handleJoinClass = (e) => {
    e.preventDefault();
    if (!classCode) {
      setError("Please enter a valid class code.");
    } else {
      setError("");
      console.log("Joining class with code:", classCode);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-orange-100 to-green-100 mt-0">
        <main className="container mx-auto mt-0 py-10 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-8 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  Join a New Class
                </CardTitle>
                <CardDescription>
                  Enter the class code provided by your teacher
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleJoinClass}
                  className="flex items-center space-x-2"
                >
                  <Input
                    type="text"
                    placeholder="Enter class code"
                    value={classCode}
                    onChange={(e) => setClassCode(e.target.value)}
                    className="flex-grow border-2 border-orange-300 focus:border-orange-500 transition-all duration-200"
                  />
                  <Button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 text-white"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Join Class
                  </Button>
                </form>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </CardContent>
            </Card>
          </motion.div>

          <h2 className="text-2xl font-bold mb-4">Your Classrooms</h2>
          <CardCollection array={classrooms}/>
          <h2 className="text-2xl font-bold mb-4 mt-8">Suggested Classrooms</h2>
          <CardCollection array={suggestedClassrooms}/>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Classroom;
