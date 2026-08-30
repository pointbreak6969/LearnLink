import { useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, Gift, Wallet, Percent, Award, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const PointsEarned = () => {
  const [open, setOpen] = useState(false);
  const profileDetails = useSelector((state) => state.profile.profileDetails);
  const points = profileDetails?.pointsEarned || 0;
  const moneyEquivalent = (points * 0.1).toFixed(2);

  const handleRedeem = (method) => {
    if (points < 20) {
      toast.error("You need at least 20 points to redeem rewards.");
      return;
    }
    toast.success(`Redemption request for ${method} submitted! We will process it shortly.`);
    setOpen(false);
  };

  const progressPercent = Math.min(100, Math.round((points / 200) * 100));

  return (
    <div>
      <Card className="animate-fade-in-up border-brand-200 shadow-sm rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-ink-900 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-current" />
            Learning Points & Rewards
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between text-xs font-semibold text-ink-600 mb-1.5">
              <span>Tier Progress (to Gold Scholar - 200 pts)</span>
              <span>{points} / 200 pts</span>
            </div>
            <Progress
              value={progressPercent}
              className="w-full h-3 bg-brand-100 [&>div]:bg-brand-500 rounded-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-brand-50/60 rounded-2xl border border-brand-200">
            <div>
              <p className="text-xs font-semibold uppercase text-ink-500">Current Balance</p>
              <h3 className="text-3xl font-extrabold text-brand-700 mt-0.5">
                {points} <span className="text-base font-normal text-ink-600">Points</span>
              </h3>
              <p className="text-xs text-ink-600 mt-1">
                Estimated conversion value: <strong className="text-ink-900">Rs. {moneyEquivalent}</strong>
              </p>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl">
                  <Gift className="w-4 h-4 mr-1.5" /> Redeem Points
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md p-6 bg-white rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-ink-900 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-brand-600" /> Redeem Your Points
                  </DialogTitle>
                  <DialogDescription className="text-xs text-ink-500">
                    You have <strong>{points} points</strong> (Rs. {moneyEquivalent}). Choose a redemption option below:
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-3">
                  <div className="p-3.5 bg-brand-50/60 border border-brand-200 rounded-xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Wallet className="w-5 h-5 text-brand-600 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-ink-900">eSewa / Khalti / Bank Payout</p>
                        <p className="text-[11px] text-ink-500">Direct cash transfer to digital wallet</p>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleRedeem("Digital Wallet Transfer")} className="text-xs">
                      Redeem
                    </Button>
                  </div>

                  <div className="p-3.5 bg-indigo-50/60 border border-indigo-200 rounded-xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Percent className="w-5 h-5 text-indigo-600 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-ink-900">Course & Workshop Discounts</p>
                        <p className="text-[11px] text-ink-500">Instant coupon code for platform courses</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleRedeem("Course Discount Coupon")} className="text-xs border-indigo-300 text-indigo-700">
                      Redeem
                    </Button>
                  </div>

                  <div className="p-3.5 bg-purple-50/60 border border-purple-200 rounded-xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Award className="w-5 h-5 text-purple-600 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-ink-900">Verified Certificate Badges</p>
                        <p className="text-[11px] text-ink-500">Official verified completion credentials</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleRedeem("Certificate Badge")} className="text-xs border-purple-300 text-purple-700">
                      Redeem
                    </Button>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-ink-600 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Redemptions are verified and processed within 24-48 hours. Minimum 20 points required.</span>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PointsEarned;
