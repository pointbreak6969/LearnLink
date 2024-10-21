import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Award, ThumbsUp, Briefcase, BookOpen, Lightbulb, Users, Zap } from "lucide-react";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-blue-50 to-white min-h-screen">
        <div className="container mx-auto px-4 py-16">

          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold mb-4 text-gray-800">About LearnLink</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Welcome to LearnLink, where we are passionate about empowering individuals to master the world of education and knowledge sharing.
              Our platform is designed to help learners and educators connect, share, and grow together in their educational journey.
            </p>
          </div>

          {/* Achievements Section */}
          <section className="mb-16">
            <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">Our Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Crown, title: "Trusted by Thousands", description: "We have helped thousands of students and educators connect and share knowledge, enhancing their learning experience." },
                { icon: Award, title: "High-Quality Resources", description: "Our platform hosts a wide variety of top-notch educational materials, recognized for their accuracy and effectiveness." },
                { icon: ThumbsUp, title: "Positive User Feedback", description: "We consistently receive glowing reviews from our users, who appreciate the ease of use and value of our platform." },
                { icon: Briefcase, title: "Educational Partnerships", description: "We've established strong connections with leading educational institutions, bringing the best resources to our users." },
              ].map((item, index) => (
                <Card key={index} className="shadow-lg hover:shadow-2xl transition-shadow rounded-xl">
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
          </section>

          {/* Our Goals Section */}
          <section className="mb-16">
            <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">Our Goals</h2>
            <p className="text-lg text-gray-700 text-center mb-12 max-w-2xl mx-auto">
              At LearnLink, our goal is to revolutionize education by creating a vibrant community where knowledge flows freely. 
              We believe that education should be accessible and engaging for everyone. Through our platform, we aim to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: BookOpen, title: "Facilitate Knowledge Sharing", description: "We aim to create a space where learners and educators can easily share and access a wide range of educational resources." },
                { icon: Lightbulb, title: "Encourage Continuous Learning", description: "Our platform is designed to inspire lifelong learning, helping users discover new topics and expand their knowledge." },
                { icon: Users, title: "Build a Collaborative Community", description: "We foster a supportive environment where users can engage in discussions, ask questions, and learn from each other." },
                { icon: Zap, title: "Innovate Education Technology", description: "We continuously evolve our platform, incorporating the latest ed-tech innovations to enhance the learning experience." },
              ].map((item, index) => (
                <Card key={index} className="shadow-lg hover:shadow-2xl transition-shadow rounded-xl">
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
          </section>

          <div className="text-center bg-gradient-to-r from-orange-400 to-orange-500 py-12 rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold text-white mb-4">
              Together, let's shape the future of education
            </h2>
            <p className="text-lg text-white mb-6 max-w-2xl mx-auto">
              Join us in our mission to create a global community of learners and educators, and unlock your potential in the world of knowledge sharing.
            </p>
            <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
              Join Now
            </Button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default About;
