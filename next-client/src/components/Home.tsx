import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, ChevronRight, Lightbulb, Play, Star, Users, Video, Zap } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
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

  export default function Home() {
      return (
    <div className="min-h-screen flex flex-col">
      <main className="">

         <section className="relative h-[80vh] overflow-hidden">
         <div className="absolute inset-0 w-full h-full z-0">
     
            <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
              <source src={"./hero.mp4"} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
         
          <div className="absolute inset-0 bg-black/50 z-10"></div>
        </div>

        <div className="container mx-auto px-4 h-full relative z-20">
          <div className="flex flex-col justify-center h-full max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Connect Your <span className="text-orange-400 font-serif">Learning Journey</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
              Learn by engaging with interactive classrooms and collaborative resources. Connect with peers and learn from industry experts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8  rounded-lg transition-all duration-300 hover:scale-105">
                Get Started
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 hover:border-orange-500 hover:scale-105 font-semibold px-8 py-3 rounded-lg transition-all duration-300">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

        {/* why learn link */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Why Choose <span className="text-orange-500 font-serif">LearnLink</span>?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Learning and teaching is made easier through our innovative platform designed for modern education.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="h-full transition-all duration-300 hover:shadow-xl hover:border-orange-200 hover:-translate-y-2 border-gray-100"
                >
                  <CardContent className="pt-8 pb-6 px-6 text-center">
                    <div className="mb-6 flex justify-center">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

     
        {/* Benefits for teachers and students */}
        <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Built for <span className="text-orange-500 font-serif">Everyone</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Whether you're teaching or learning, our platform adapts to your needs
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif mb-6">
                    For Teachers
                  </h3>
                </div>
                <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border-gray-100">
                  <CardContent className="pt-8 pb-6 px-6 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-orange-100 p-3 rounded-full flex-shrink-0">
                        <Video className="h-6 w-6 text-orange-500" />
                      </div>
                      <p className="text-gray-700 font-medium">Interactive whiteboard with embedded videos</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-orange-100 p-3 rounded-full flex-shrink-0">
                        <BookOpen className="h-6 w-6 text-orange-500" />
                      </div>
                      <p className="text-gray-700 font-medium">Automatic storage of all teaching materials</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif mb-6">
                    For Students
                  </h3>
                </div>
                <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border-gray-100">
                  <CardContent className="pt-8 pb-6 px-6 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-orange-100 p-3 rounded-full flex-shrink-0">
                        <BookOpen className="h-6 w-6 text-orange-500" />
                      </div>
                      <p className="text-gray-700 font-medium">Dedicated platform for study materials</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-orange-100 p-3 rounded-full flex-shrink-0">
                        <Users className="h-6 w-6 text-orange-500" />
                      </div>
                      <p className="text-gray-700 font-medium">Collaborative learning experiences</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Unlock Your <span className="text-orange-500 font-serif">Potential</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the features that make learning and growth possible for everyone
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                { icon: BookOpen, title: "Diverse Courses", description: "Access a wide range of courses taught by industry experts and experienced professionals" },
                { icon: Users, title: "Collaborative Learning", description: "Engage with peers in interactive study groups and real-world projects" },
                { icon: Zap, title: "Skill Advancement", description: "Track your progress and earn certificates to boost your career prospects" },
              ].map((feature) => (
                <div key={feature.title} className="text-center space-y-6 group">
                  <div className="bg-gradient-to-br from-orange-100 to-orange-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-300 group-hover:scale-110">
                    <feature.icon className="w-10 h-10 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="container mx-auto px-6 space-y-12">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-serif mb-4">
                What Our Learners Say
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real stories from students and teachers who transformed their learning journey
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                { name: "Alex Johnson", role: "Software Developer", quote: "LearnLink transformed my coding skills and opened up incredible career opportunities I never thought possible." },
                { name: "Sarah Lee", role: "Marketing Specialist", quote: "The collaborative projects helped me apply my learning in real-world scenarios and build lasting professional connections." },
                { name: "Michael Chen", role: "Data Analyst", quote: "The expert-led courses and supportive community accelerated my learning journey beyond my expectations." },
              ].map((testimonial) => (
                <div key={testimonial.name} className="bg-white hover:scale-105 p-8 rounded-2xl shadow-lg hover:shadow-xl space-y-6 transition-all duration-300">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic text-lg leading-relaxed">"{testimonial.quote}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-lg text-gray-900">{testimonial.name}</p>
                    <p className="text-orange-500 font-medium">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-white text-center">
          <div className="container mx-auto px-6 space-y-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Ready to Start Your <span className="text-orange-500 font-serif">Learning Journey</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                Join thousands of learners who are advancing their careers and expanding their knowledge with LearnLink's innovative platform.
              </p>
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xl px-12 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                <Link href={'/signup'} className="flex items-center">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        {/* <FewCourses/>
        <Faq/> */}
      </main>
    </div>
  )
  }