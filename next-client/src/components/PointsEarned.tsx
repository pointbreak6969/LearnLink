import React, { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, Gift, Upload, Users } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const PointsEarned = () => {
  const [open, setOpen] = useState(false);

  const points = 60;
  const moneyEquivalent = (points * 0.1).toFixed(2);

  const handleCashRedemption = () => {
    console.log("Cash redemption process initiated");
  };

  const handleGiftCardRedemption = () => {
    console.log("Gift card redemption process initiated");
  };

  const handleDiscountRedemption = () => {
    console.log("Discount redemption process initiated");
  };

  return (
    <div>
      <TabsContent value="points">
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#FF9500]">
              Points Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress
              value={60}
              className="w-full mb-4 bg-orange-200 [&>div]:bg-[#FF9500]"
            />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-[#FF9500] flex items-center">
                  <Star className="mr-2" /> You Have Earned
                </h3>
                <p className="text-xl font-semibold text-[#FF9500]">
                  {points} Points
                </p>
              </div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#FF9500] text-white hover:bg-[#E68600] transition-all duration-300 hover:scale-105">
                    Redeem Points
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Redeem Your Points</DialogTitle>
                    <DialogDescription>
                      You have earned {points} points, which is equivalent to{" "}
                      <strong className="text-gray-900">
                        Rs. {moneyEquivalent}.
                      </strong>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-orange-600 mb-2">
                      Available Redemption Options:
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li className="flex items-start justify-between">
                        <div className="flex items-start">
                          <Upload className="mr-2 text-orange-500" />
                          <div>
                            <strong>Cash via eswea or bank transfer:</strong>{" "}
                            Redeem your points for direct cash transfers to your
                            bank account or eswea account.
                          </div>
                        </div>
                        <Button
                          onClick={handleCashRedemption}
                          className="ml-4  text-white "
                          varient="default"
                        >
                          Redeem
                        </Button>
                      </li>
                      <li className="flex items-start justify-between">
                        <div className="flex items-start">
                          <Users className="mr-2 text-orange-500" />
                          <div>
                            <strong>Gift cards:</strong> Use your points to get
                            gift cards for popular stores and online platforms.
                          </div>
                        </div>
                        <Button
                          onClick={handleGiftCardRedemption}
                          className="ml-4  text-white "
                          varient="default"
                        >
                          Redeem
                        </Button>
                      </li>
                      <li className="flex items-start justify-between">
                        <div className="flex items-start">
                          <Gift className="mr-2 text-orange-500" />
                          <div>
                            <strong>Discounts on paid courses:</strong> Redeem
                            your points for discounts on various courses offered
                            on our platform.
                          </div>
                        </div>
                        <Button
                          onClick={handleDiscountRedemption}
                          className="ml-4  text-white "
                          varient="default"
                        >
                          Redeem
                        </Button>
                      </li>
                    </ul>
                    <h4 className="text-md font-semibold mt-4 text-orange-600">
                      Process to Redeem Points:
                    </h4>
                    <ul className="list-decimal list-inside space-y-1 mt-2">
                      <li>Select Your Redemption Option</li>
                      <li>Enter the amount of points to redeem.</li>
                      <li>Review your redemption details.</li>
                      <li>Confirm your redemption.</li>
                      <li>Wait for your redemption to be processed.</li>
                      <li>Receive your redemption reward.</li>
                      <li>Enjoy your reward!</li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-600 text-center italic">
                    P.s: Reedemption may take time to process,So be patient.
                  </p>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default PointsEarned;
