"use client";
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
  LucideIcon,
} from "lucide-react";
import biraj from "../../../../assets/imgs/biraj.jpg";
import ashim from "../../../../assets/imgs/ashim.jpg";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

interface Achievement {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface Goal {
  icon: LucideIcon;
  title: string;
  description: string;
}

const Page = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-50 to-white min-h-screen">
        <div className="container mx-auto px-4 py-16">
          {/* Section Header with Animation */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl font-extrabold mb-4 text-gray-800">
              About LearnLink
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
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
            <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
              Our Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(
                [
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
                ] as Achievement[]
              ).map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card className="flex flex-col h-full">
                    <CardContent className="flex items-start p-6 flex-grow">
                      <item.icon className="w-10 h-10 text-orange-500 mr-4" />
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
            Our Goals
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-2xl mx-auto">
            At LearnLink, our goal is to revolutionize education by creating a
            vibrant community where knowledge flows freely. We believe that
            education should be accessible and engaging for everyone. Through
            our platform, we aim to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(
              [
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
              ] as Goal[]
            ).map((item, index) => (
              <Card key={index}>
                <CardContent className="flex items-start p-6">
                  <item.icon className="w-10 h-10 text-orange-500 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-orange-500 text-center p-5 m-5">
            <h2 className="text-4xl font-bold text-white mb-4">
              Together, let's shape the future of education
            </h2>
            <p className="text-lg text-white mb-6 max-w-2xl mx-auto">
              Join us in our mission to create a global community of learners
              and educators, and unlock your potential in the world of knowledge
              sharing.
            </p>
            <Button
              size="lg"
              className="bg-white text-orange-500 hover:bg-gray-100"
            >
              Join Now
            </Button>
          </div>
          <section className="px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="mb-6 text-3xl font-bold">Meet Collaborator</h3>
              <p className="mb-6 pb-2 text-neutral-500 dark:text-neutral-300 md:mb-12 italic">
                Meet our diverse community of collaborators, working together to
                inspire and elevate your educational journey
              </p>
            </div>

            <div className="grid gap-12 text-center md:grid-cols-2">
              <div className="mb-6 md:mb-0">
                <div className="mb-6 flex justify-center">
                  <Image
                    src={ashim}
                    alt="Ashim Gautam"
                    className="w-32 h-32 rounded-full object-cover shadow-lg dark:shadow-black/30"
                    width={128}
                    height={128}
                  />
                </div>
                <p className="my-4 text-xl text-neutral-700 dark:text-neutral-300 italic">
                  "Building LearnLink has been an exciting journey, creating a
                  space where developers and learners can come together to share
                  knowledge and grow"
                </p>
                <p className="italic font-bold">- Ashim Gautam</p>
              </div>

              <div className="mb-0">
                <div className="mb-6 flex justify-center">
                  <Image
                    src={biraj}
                    alt="Biraj Baral"
                    className="w-32 h-32 rounded-full object-cover shadow-lg dark:shadow-black/30"
                    width={128}
                    height={128}
                  />
                </div>
                <p className="my-4 text-xl text-neutral-700 dark:text-neutral-300 italic">
                  "Working on LearnLink has been a fantastic opportunity to
                  contribute to an evolving platform that's all about fostering
                  collaboration and continuous learning"
                </p>
                <p className="italic font-bold">- Biraj Baral</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Page;
