
import Faq from '@/components/Faq'
import { Button } from '@/components/ui/button'
import { BookOpen, ChevronRight, Lightbulb, Star, Users, Video, Zap } from 'lucide-react'
import { motion } from "framer-motion"
import FewCourses from '@/components/FewCourses'
import { Link } from 'react-router-dom'
import { Card, CardContent } from "@/components/ui/card"
import video_hero from '../../public/hero.mp4'
const Home = () => {
  
  const features = [
    {
      title: "Store All Activities",
      description:
        "Store all the activities that were seen and presented during the class so that during the time of self-learning you can remember the same thing and don't miss a single point.",
      icon: <BookOpen className="h-8 w-8 text-brand-500" />,
    },
    {
      title: "Dedicated Platform",
      description:
        "A dedicated platform to store the reading materials only, making it easy to find what you need when you need it.",
      icon: <Lightbulb className="h-8 w-8 text-brand-500" />,
    },
    {
      title: "Group Study Session",
      description:
        "Connect with peers for collaborative learning sessions that enhance understanding through discussion.",
      icon: <Users className="h-8 w-8 text-brand-500" />,
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
          <div className="flex flex-col justify-center h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl space-y-6"
            >
              <motion.h1
                className="font-display text-4xl md:text-6xl font-semibold text-white leading-[1.05] text-balance"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Connect your <span className="text-brand-400 italic">learning journey</span>
              </motion.h1>

              <motion.p
                className="text-lg text-white/80 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Learn by engaging with interactive classrooms and collaborative resources — and learn from peers and experts.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Button size="lg" asChild>
                  <Link to="/signup">
                    Get Started
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white hover:border-white/50"
                  asChild
                >
                  <Link to="/about">Learn More</Link>
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
            className="font-display text-3xl md:text-4xl font-semibold text-center mb-12 text-ink-900 text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Learning and teaching is easier through <span className="text-brand-500 italic">LearnLink</span>
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
                  className="h-full transition-all duration-300 hover:border-brand-300 hover:shadow-glow hover:-translate-y-1"
                >
                  <CardContent className="pt-6">
                    <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-brand-50">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-ink-900">Point {index + 1}</h3>
                    <p className="text-ink-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     
       {/* Benifits for teachers and students */}

        <section className="py-16 bg-brand-50/60">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 m-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="font-display text-2xl font-semibold text-ink-900">For Teachers</h2>
              <Card className="transition-all duration-300 hover:border-brand-300 hover:shadow-glow">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-brand-100 p-2 rounded-full">
                      <Video className="h-5 w-5 text-brand-600" />
                    </div>
                    <p className="text-ink-700">White board embedded videos</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-brand-100 p-2 rounded-full">
                      <BookOpen className="h-5 w-5 text-brand-600" />
                    </div>
                    <p className="text-ink-700">Everything you wrote will be stored</p>
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
              <h2 className="font-display text-2xl font-semibold text-ink-900">For Students</h2>
              <Card className="transition-all duration-300 hover:border-brand-300 hover:shadow-glow">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-brand-100 p-2 rounded-full">
                      <BookOpen className="h-5 w-5 text-brand-600" />
                    </div>
                    <p className="text-ink-700">Dedicated platform to store the study materials</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-brand-100 p-2 rounded-full">
                      <Users className="h-5 w-5 text-brand-600" />
                    </div>
                    <p className="text-ink-700">Collaborative learning</p>
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
                  <div className="bg-brand-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:bg-brand-200 transition-colors">
                    <feature.icon className="w-10 h-10 text-brand-600" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-ink-900">{feature.title}</h3>
                  <p className="text-ink-600 text-lg">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-50/60">
          <div className="container mx-auto px-4 space-y-12">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-center text-ink-900">What Our Learners Say</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-10">
              {[
                { name: "Alex Johnson", role: "Software Developer", quote: "LearnLink transformed my coding skills and career prospects." },
                { name: "Sarah Lee", role: "Marketing Specialist", quote: "The collaborative projects helped me apply my learning in real-world scenarios." },
                { name: "Michael Chen", role: "Data Analyst", quote: "The expert-led courses and supportive community accelerated my learning journey." },
              ].map((testimonial) => (
                <div key={testimonial.name} className="bg-white hover:-translate-y-1 transition-transform duration-300 p-8 rounded-2xl shadow-card space-y-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-brand-400 text-brand-400" />
                    ))}
                  </div>
                  <p className="text-ink-600 italic text-lg">&quot;{testimonial.quote}&quot;</p>
                  <div>
                    <p className="font-semibold text-lg text-ink-900">{testimonial.name}</p>
                    <p className="text-ink-500">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white text-center">
          <div className="container mx-auto px-4 space-y-8">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink-900 text-balance">Ready to start your learning journey?</h2>
            <p className="text-xl text-ink-600 max-w-3xl mx-auto">
              Join thousands of learners who are advancing their careers and expanding their knowledge with LearnLink.
            </p>
            <Button size="lg" className="text-lg px-10 py-6 rounded-xl" asChild>
              <Link to="/signup">Get Started Now</Link>
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

