
import Faq from '@/components/Faq'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, BookOpen, ChevronRight, Lightbulb, Play, Star, Users, Video, Zap } from 'lucide-react'
import React, { useState } from 'react'
import { motion } from "framer-motion"
import FewCourses from '@/components/FewCourses'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent } from "@/components/ui/card"
import video_hero from '../../public/hero.mp4'
const Home = () => {
  const navigate = useNavigate()
  
  const features = [
    {
      title: "Store All Activities",
      description:
        "Store all the activities that were seen and presented during the class so that during the time of self-learning you can remember the same thing and don't miss a single point.",
      icon: <BookOpen className="h-8 w-8 text-orange-500" />,
    },
    {
      title: "Dedicated Platform",
      description:
        "A dedicated platform to store the reading materials only, making it easy to find what you need when you need it.",
      icon: <Lightbulb className="h-8 w-8 text-orange-500" />,
    },
    {
      title: "Group Study Session",
      description:
        "Connect with peers for collaborative learning sessions that enhance understanding through discussion.",
      icon: <Users className="h-8 w-8 text-orange-500" />,
    },
  ]
  return (
    <div className="min-h-screen flex flex-col">
      <main className="">

         <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
     
            <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
              <source src={video_hero} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
         
          <div className="absolute inset-0 bg-black/50 z-10"></div>
        </div>

        <div className="container mx-auto px-4 h-full relative z-20">
          <div className="flex flex-col justify-center h-full ml-20 -mt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl space-y-6"
            >
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Connect Your <span className="text-orange-400 font-serif text-6xl">Learning Journey</span>
              </motion.h1>

              <motion.p
                className="text-lg text-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
               <span className='italic text-gray-300 font-semibold'> Learn by engaging with interactive classrooms and collaborative resources. Learn from peers and experts.</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Button className="bg-orange-500 hover:bg-orange-600 mt-12">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-orange-400 text-white hover:bg-orange-500/20 mt-12 ml-4 bg-orange-400">
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

        {/* why learn link */}
                  <section className="py-16 bg-white m-10">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-gray-900 font-mono"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Learning and teaching is easier through <span className="text-orange-500 font-serif">Learn Link</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card
                  className={'h-full transition-all duration-300 hover:bg-orange-50 hover:border-red-900 hover:rounded-xl hover:scale-105'}
                >
                  <CardContent className="pt-6">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Point {index + 1}</h3>
                    <p className="text-gray-700">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     
       {/* Benifits for teachers and students */}

        <section className="py-16 bg-orange-50 ">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 m-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 font-serif">For Teachers</h2>
              <Card className="transition-all duration-300 hover:border-red-900 hover:rounded-xl hover:scale-105">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <Video className="h-5 w-5 text-orange-500" />
                    </div>
                    <p className="text-gray-700">White board embedded videos</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <BookOpen className="h-5 w-5 text-orange-500" />
                    </div>
                    <p className="text-gray-700">Everything you wrote will be stored</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 font-serif">For Students</h2>
              <Card className="transition-all duration-300 hover:border-red-900 hover:rounded-xl hover:scale-105">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <BookOpen className="h-5 w-5 text-orange-500" />
                    </div>
                    <p className="text-gray-700">Dedicated platform to store the study materials</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <Users className="h-5 w-5 text-orange-500" />
                    </div>
                    <p className="text-gray-700">Collaborative learning</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

        <section className="py-20 bg-white m-10">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-16">
              {[
                { icon: BookOpen, title: "Diverse Courses", description: "Access a wide range of courses taught by industry experts" },
                { icon: Users, title: "Collaborative Learning", description: "Engage with peers in interactive study groups and projects" },
                { icon: Zap, title: "Skill Advancement", description: "Track your progress and earn certificates to boost your career" },
              ].map((feature) => (
                <div key={feature.title} className="text-center space-y-6 group">
                  <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:bg-orange-200 transition-colors">
                    <feature.icon className="w-10 h-10 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600 text-lg">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-orange-50">
          <div className="container mx-auto px-4 space-y-12">
            <h2 className="text-4xl md:text-5xl font-bold text-center font-serif">What Our Learners Say</h2>
            <div className="grid md:grid-cols-3 gap-12 m-10">
              {[
                { name: "Alex Johnson", role: "Software Developer", quote: "LearnLink transformed my coding skills and career prospects." },
                { name: "Sarah Lee", role: "Marketing Specialist", quote: "The collaborative projects helped me apply my learning in real-world scenarios." },
                { name: "Michael Chen", role: "Data Analyst", quote: "The expert-led courses and supportive community accelerated my learning journey." },
              ].map((testimonial) => (
                <div key={testimonial.name} className="bg-white hover:scale-105 p-8 rounded-xl shadow-lg space-y-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic text-lg">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-lg">{testimonial.name}</p>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-white text-center">
          <div className="container mx-auto px-4 space-y-12">
            <h2 className="text-4xl md:text-5xl font-bold">Ready to Start Your Learning Journey?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of learners who are advancing their careers and expanding their knowledge with LearnLink.
            </p>
            <Button  size="lg" className="text-xl px-12 py-6 rounded-xl">
              <Link to={'/signup'} >Get Started Now</Link>
            </Button>
          </div>
        </section>
        <FewCourses/>
        <Faq/>
      </main>
    </div>
  )
}

export default Home

