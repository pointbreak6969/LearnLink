import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Users, Star, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Reward = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-brand-50 py-12">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl font-bold text-center mb-8 text-brand-600"
          >
            LearnLink Rewards
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-center mb-12 text-ink-700"
          >
            Earn points by contributing and convert them into real money!
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: <Upload className="w-12 h-12 text-brand-500" />, title: "Upload Notes", points: "50 points per upload" },
              { icon: <Users className="w-12 h-12 text-brand-500" />, title: "Refer Friends", points: "100 points per referral" },
              { icon: <Star className="w-12 h-12 text-brand-500" />, title: "Get Upvotes", points: "5 points per upvote" },
            ].map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
                transition={{ duration: 0.8, delay: 0.2 * (index + 1) }}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <Card className="h-full">
                  <CardContent className="flex flex-col items-center p-6">
                    <div className="mb-4">{method.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-brand-600">{method.title}</h3>
                    <p className="text-ink-600 text-center">{method.points}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-brand-600 flex items-center">
                    <Gift className="w-6 h-6 mr-2" /> Redeem Your Points
                  </h3>
                  <p className="mb-4">Convert your points into:</p>
                  <ul className="space-y-2">
                    <li>• Cash via eswea or bank transfer</li>
                    <li>• Gift cards</li>
                    <li>• Discounts on paid courses</li>
                  </ul>
                  <h4 className="text-lg font-semibold mt-4 text-brand-600">Process to Redeem Points:</h4>
                  <ol className="list-decimal list-inside space-y-2 mt-2">
                    <li>Log in to your account.</li>
                    <li>Go to the Profile and select Points Earned .</li>
                    <li>Select your preferred redemption option.</li>
                    <li>Confirm and process your request.</li>
                  </ol>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center h-full justify-center">
                  <div className="mb-4 inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-100">
                    <Gift className="h-8 w-8 text-brand-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-brand-600">
                    Redeem points for real money
                  </h3>
                  <p className="text-ink-500 text-sm">
                    Cash out your earned points straight to your wallet or bank account.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-center"
          >
            <Button size="lg" className="rounded-full px-8">
              Start Earning Now
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Reward;
