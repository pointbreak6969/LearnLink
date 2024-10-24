import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const classrooms = [
  { id: '1', name: 'Advanced Web Development', teacher: 'Dr. Jane Smith', description: 'Learn the latest web technologies and frameworks.', price: 2000 },
  { id: '2', name: 'Data Structures and Algorithms', teacher: 'Prof. John Doe', description: 'Deep dive into data structures and algorithm design.', price: 1500 },
];

const suggestedClassrooms = [
  { id: '3', name: 'Machine Learning Basics', teacher: 'Dr. Alice Johnson', price: 2500 },
  { id: '4', name: 'Introduction to UX/UI Design', teacher: 'Prof. Emma Brown', price: 1800 },
  { id: '5', name: 'Web Development Bootcamp', teacher: 'Dr. Mark Lee', price: 3000 },
  { id: '6', name: 'Cloud Computing Essentials', teacher: 'Prof. Sarah White', price: 2200 },
  { id: '7', name: 'Cybersecurity Fundamentals', teacher: 'Dr. John Doe', price: 2700 },
];

const Classroom = () => {
  const [classCode, setClassCode] = useState('');
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 4;
  const autoScrollInterval = 3000;

  const extendedClassrooms = [...suggestedClassrooms, ...suggestedClassrooms];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(extendedClassrooms.length / itemsToShow));
    }, autoScrollInterval);
    return () => clearInterval(interval);
  }, []);

  const handleJoinClass = (e) => {
    e.preventDefault();
    if (!classCode) {
      setError('Please enter a valid class code.');
    } else {
      setError('');
      console.log('Joining class with code:', classCode);
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
                <CardTitle className="text-lg font-bold">Join a New Class</CardTitle>
                <CardDescription>Enter the class code provided by your teacher</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleJoinClass} className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Enter class code"
                    value={classCode}
                    onChange={(e) => setClassCode(e.target.value)}
                    className="flex-grow border-2 border-orange-300 focus:border-orange-500 transition-all duration-200"
                  />
                  <Button type="submit" className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 text-white">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Join Class
                  </Button>
                </form>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </CardContent>
            </Card>
          </motion.div>

          <h2 className="text-2xl font-bold mb-4">Your Classrooms</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {classrooms.map((classroom) => (
              <motion.div
                key={classroom.id}
                initial={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white shadow-lg border border-slate-200 rounded-3xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">{classroom.name}</CardTitle>
                    <CardDescription>{classroom.teacher}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">{classroom.description}</p>
                    <p className="text-sm mb-2">Price: ₹{classroom.price}</p>
                    <Link to={`/classroom/${classroom.id}`}>
                      <Button className="w-full bg-orange-500 hover:bg-slate-900/90 transition-all duration-300 text-white">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Enter Classroom
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-4 mt-8">Suggested Classrooms</h2>
          <Carousel className="w-full" opts={{ align: "start" }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {extendedClassrooms.slice(currentIndex * itemsToShow, currentIndex * itemsToShow + itemsToShow).map((classroom) => (
                <CarouselItem key={classroom.id} className="pl-2 md:pl-4 basis-1/4">
                  <Card className="h-full bg-white border border-slate-200 rounded-3xl">
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg font-bold">{classroom.name}</CardTitle>
                      <CardDescription className="text-sm">{classroom.teacher}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm mb-2">Price: ₹{classroom.price}</p>
                      <Link to={'/classroom'}>
                        <Button className="w-full bg-orange-500 hover:bg-slate-900/90 transition-all duration-300 text-white">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Join ClassRoom
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-4" />
            <CarouselNext className="mr-4" />
          </Carousel>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Classroom;
