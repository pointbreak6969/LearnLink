import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, BookOpen, ChevronRightCircle, Star, Users, Zap } from 'lucide-react'
import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="">
        <section className="h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-orange-100">
          <div className="container mx-auto px-4 text-center space-y-12">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              <span className="text-orange-600">Connect</span> Your Learning Journey
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto">
              Unlock your potential with interactive classrooms and collaborative resources. Learn from peers and  experts.
            </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Input placeholder="Enter your email" className="max-w-md text-lg h-14 rounded-lg" />
              <Button size="lg" className="group text-xl h-14 px-8">
                Get Started
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>

       

        <section className="py-20 bg-white">
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
            <h2 className="text-4xl md:text-5xl font-bold text-center">What Our Learners Say</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { name: "Alex Johnson", role: "Software Developer", quote: "LearnLink transformed my coding skills and career prospects." },
                { name: "Sarah Lee", role: "Marketing Specialist", quote: "The collaborative projects helped me apply my learning in real-world scenarios." },
                { name: "Michael Chen", role: "Data Analyst", quote: "The expert-led courses and supportive community accelerated my learning journey." },
              ].map((testimonial) => (
                <div key={testimonial.name} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
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
            <Button  size="lg" className="text-xl px-12 py-6">
              <a href='/signup' >Get Started Now</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  )
}

export default Home