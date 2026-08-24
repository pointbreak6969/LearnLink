import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Crown,
  Award,
  ThumbsUp,
  Briefcase,
  BookOpen,
  Lightbulb,
  Users,
  Zap,
} from "lucide-react";
import biraj from '../assets/imgs/biraj.jpg'
import ashim from '../assets/imgs/ashim.jpg'
import { motion } from "framer-motion"; 

const About = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-brand-50/60 to-white min-h-screen">
        <div className="container mx-auto px-4 py-16">
          {/* Section Header with Animation */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-display text-5xl font-semibold mb-4 text-ink-900 text-balance">
              About LearnLink
            </h1>
            <p className="text-lg text-ink-600 max-w-3xl mx-auto">
              Welcome to LearnLink, where we are passionate about empowering
              individuals to master the world of education and knowledge
              sharing. Our platform is designed to help learners and educators
              connect, share, and grow together in their educational journey.
            </p>
          </motion.div>

          <motion.section
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="font-display text-4xl font-semibold text-center text-ink-900 mb-10">
              Our Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Crown,
                  title: "Trusted by Thousands",
                  description:
                    "We have helped thousands of students and educators connect and share knowledge, enhancing their learning experience.",
                },
                {
                  icon: Award,
                  title: "High-Quality Resources",
                  description:
                    "Our platform hosts a wide variety of top-notch educational materials, recognized for their accuracy and effectiveness.",
                },
                {
                  icon: ThumbsUp,
                  title: "Positive User Feedback",
                  description:
                    "We consistently receive glowing reviews from our users, who appreciate the ease of use and value of our platform.",
                },
                {
                  icon: Briefcase,
                  title: "Educational Partnerships",
                  description:
                    "We've established strong connections with leading educational institutions, bringing the best resources to our users.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card className="flex flex-col h-full transition-all duration-300 hover:border-brand-300 hover:shadow-glow">
                    <CardContent className="flex items-start p-6 flex-grow">
                      <div className="mr-4 inline-flex items-center justify-center h-11 w-11 rounded-xl bg-brand-50 flex-shrink-0">
                        <item.icon className="w-6 h-6 text-brand-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1 text-ink-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-ink-600">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <h2 className="font-display text-4xl font-semibold text-center text-ink-900 mb-6">
            Our Goals
          </h2>
          <p className="text-lg text-ink-600 text-center mb-12 max-w-2xl mx-auto">
            At LearnLink, our goal is to revolutionize education by creating a
            vibrant community where knowledge flows freely. We believe that
            education should be accessible and engaging for everyone. Through
            our platform, we aim to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Facilitate Knowledge Sharing",
                description:
                  "We aim to create a space where learners and educators can easily share and access a wide range of educational resources.",
              },
              {
                icon: Lightbulb,
                title: "Encourage Continuous Learning",
                description:
                  "Our platform is designed to inspire lifelong learning, helping users discover new topics and expand their knowledge.",
              },
              {
                icon: Users,
                title: "Build a Collaborative Community",
                description:
                  "We foster a supportive environment where users can engage in discussions, ask questions, and learn from each other.",
              },
              {
                icon: Zap,
                title: "Innovate Education Technology",
                description:
                  "We continuously evolve our platform, incorporating the latest ed-tech innovations to enhance the learning experience.",
              },
            ].map((item, index) => (
              <Card key={item.title} className="transition-all duration-300 hover:border-brand-300 hover:shadow-glow">
                <CardContent className="flex items-start p-6">
                  <div className="mr-4 inline-flex items-center justify-center h-11 w-11 rounded-xl bg-brand-50 flex-shrink-0">
                    <item.icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-ink-900">{item.title}</h3>
                    <p className="text-sm text-ink-600">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-br from-brand-500 to-brand-600 text-center p-10 md:p-14 my-16 rounded-3xl shadow-glow">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4 text-balance">
              Together, let's shape the future of education
            </h2>
            <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto">
              Join us in our mission to create a global community of learners
              and educators, and unlock your potential in the world of knowledge
              sharing.
            </p>
            <Button
              size="lg"
              className="bg-white text-brand-600 hover:bg-brand-50"
            >
              Join Now
            </Button>
          </div>
          <section className="px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="font-display mb-4 text-3xl font-semibold text-ink-900">Meet the Collaborators</h3>
              <p className="mb-12 text-ink-500 italic">
                Meet our diverse community of collaborators, working together to inspire and elevate your educational journey
              </p>
            </div>

            <div className="grid gap-12 text-center md:grid-cols-2">
              <div>
                <div className="mb-6 flex justify-center">
                  <img
                    src={ashim}
                    className="w-28 h-28 rounded-full object-cover shadow-card ring-4 ring-brand-100"
                  />
                </div>
                <p className="mb-4 text-lg text-ink-700 italic">
                  "Building LearnLink has been an exciting journey, creating a space where developers and learners can come together to share knowledge and grow"
                </p>
                <p className="italic font-semibold text-ink-900">— Ashim Gautam</p>
              </div>

              <div>
                <div className="mb-6 flex justify-center">
                  <img
                    src={biraj}
                    className="w-28 h-28 rounded-full object-cover shadow-card ring-4 ring-brand-100"
                  />
                </div>
                <p className="mb-4 text-lg text-ink-700 italic">
                  "Working on LearnLink has been a fantastic opportunity to contribute to an evolving platform that's all about fostering collaboration and continuous learning"
                </p>
                <p className="italic font-semibold text-ink-900">— Biraj Baral</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
};

export default About;
