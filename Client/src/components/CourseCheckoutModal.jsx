import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CreditCard,
  CheckCircle2,
  Lock,
  Sparkles,
  ShieldCheck,
  Zap,
  Tag,
  ArrowRight,
  Loader2,
  Smartphone,
} from "lucide-react";
import { toast } from "sonner";
import courseService from "@/services/course";
import { useNavigate } from "react-router-dom";

export default function CourseCheckoutModal({
  isOpen,
  onClose,
  course,
  user,
  onSuccess,
}) {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("express"); // "express" | "card" | "upi"
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [receipt, setReceipt] = useState(null);

  // Form states for mock card
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("888");
  const [upiId, setUpiId] = useState("");

  if (!course) return null;

  const basePrice = Number(course.price) || 19.99;
  const originalPrice = Number(course.originalPrice) || 89.99;
  const discountAmount = appliedDiscount > 0 ? (basePrice * (appliedDiscount / 100)) : 0;
  const finalPrice = Math.max(0, Number((basePrice - discountAmount).toFixed(2)));

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === "LEARNLINK50" || code === "SAVE50") {
      setAppliedDiscount(50);
      setCouponApplied(true);
      toast.success("Coupon applied! 50% extra discount added.");
    } else if (code === "FREEPASS" || code === "WELCOME100") {
      setAppliedDiscount(100);
      setCouponApplied(true);
      toast.success("Special VIP coupon applied! 100% discount.");
    } else {
      toast.error("Invalid coupon code. Try 'LEARNLINK50' or 'FREEPASS'");
    }
  };

  const handleCompletePurchase = async () => {
    if (!user) {
      toast.error("Please login to complete purchase");
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate rapid secure processing
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const enrollmentData = await courseService.purchaseCourse({
        courseId: course.id,
        courseTitle: course.title,
        pricePaid: finalPrice,
        currency: "USD",
        paymentMethod:
          paymentMethod === "express"
            ? "1-Click Express"
            : paymentMethod === "card"
            ? "Credit/Debit Card"
            : "UPI / Digital Wallet",
        userId: user._id || user.id,
      });

      setReceipt(enrollmentData);
      setIsSuccess(true);
      toast.success(`Successfully enrolled in ${course.title}!`);
      if (onSuccess) {
        onSuccess(enrollmentData);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGoToCourse = () => {
    onClose();
    navigate(`/courses/${course.id}/learn`);
  };

  const handleModalClose = () => {
    if (isProcessing) return;
    setIsSuccess(false);
    setReceipt(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white rounded-2xl border border-ink-100 shadow-2xl">
        {isSuccess ? (
          <div className="p-8 text-center bg-gradient-to-b from-brand-50/60 to-white">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-ink-900 mb-2">
              Enrollment Confirmed!
            </h2>
            <p className="text-ink-600 text-sm max-w-md mx-auto mb-6">
              Congratulations <span className="font-semibold text-ink-900">{user?.fullName || "Learner"}</span>,
              you now have lifetime access to{" "}
              <span className="font-semibold text-brand-600">{course.title}</span>.
            </p>

            <div className="bg-white border border-ink-100 rounded-xl p-5 mb-6 text-left shadow-sm max-w-md mx-auto space-y-2">
              <div className="flex justify-between text-xs text-ink-500">
                <span>Transaction ID:</span>
                <span className="font-mono text-ink-700">{receipt?.transactionId || "TXN_OK"}</span>
              </div>
              <div className="flex justify-between text-xs text-ink-500">
                <span>Amount Paid:</span>
                <span className="font-semibold text-ink-900">
                  {finalPrice === 0 ? "FREE" : `$${finalPrice.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-xs text-ink-500">
                <span>Access:</span>
                <span className="text-emerald-600 font-medium">Full Lifetime Access + Certificate</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <Button
                onClick={handleGoToCourse}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 gap-2"
              >
                <span>Start Learning Now</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  onClose();
                  navigate("/courses");
                }}
                className="w-full border-ink-200 hover:bg-ink-50"
              >
                Browse More Courses
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <DialogHeader className="p-6 bg-gradient-to-r from-ink-900 to-ink-800 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-xl md:text-2xl font-bold font-display text-white">
                    Checkout & Enrollment
                  </DialogTitle>
                  <DialogDescription className="text-ink-200 text-xs mt-1">
                    Secure 256-Bit SSL Encrypted Checkout
                  </DialogDescription>
                </div>
                <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-xs text-brand-300 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verified Purchase</span>
                </div>
              </div>
            </DialogHeader>

            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 max-h-[78vh] overflow-y-auto">
              {/* Left column: Payment options */}
              <div className="md:col-span-7 space-y-5">
                <div>
                  <label className="text-xs font-semibold text-ink-700 uppercase tracking-wider block mb-2">
                    Choose Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("express")}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                        paymentMethod === "express"
                          ? "border-brand-500 bg-brand-50 text-brand-700 font-semibold ring-2 ring-brand-400/30"
                          : "border-ink-200 hover:border-brand-300 text-ink-700 bg-white"
                      }`}
                    >
                      <Zap className="w-5 h-5 text-brand-500" />
                      <span className="text-xs">1-Click Fast</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                        paymentMethod === "card"
                          ? "border-brand-500 bg-brand-50 text-brand-700 font-semibold ring-2 ring-brand-400/30"
                          : "border-ink-200 hover:border-brand-300 text-ink-700 bg-white"
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-ink-700" />
                      <span className="text-xs">Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                        paymentMethod === "upi"
                          ? "border-brand-500 bg-brand-50 text-brand-700 font-semibold ring-2 ring-brand-400/30"
                          : "border-ink-200 hover:border-brand-300 text-ink-700 bg-white"
                      }`}
                    >
                      <Smartphone className="w-5 h-5 text-ink-700" />
                      <span className="text-xs">UPI / Wallet</span>
                    </button>
                  </div>
                </div>

                {/* Method details */}
                {paymentMethod === "express" && (
                  <div className="bg-brand-50/70 border border-brand-200 rounded-xl p-4 text-xs text-ink-700 space-y-2">
                    <div className="flex items-center gap-2 text-brand-800 font-semibold text-sm">
                      <Sparkles className="w-4 h-4 text-brand-600" />
                      Instant 1-Click Enrollment
                    </div>
                    <p className="text-ink-600 leading-relaxed">
                      Instant direct checkout simulated for your student profile. No card details required.
                    </p>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="space-y-3 bg-ink-50/60 p-4 rounded-xl border border-ink-100">
                    <div>
                      <label className="text-xs text-ink-600 font-medium mb-1 block">
                        Card Number
                      </label>
                      <Input
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 4242 4242 4242"
                        className="bg-white text-xs font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-ink-600 font-medium mb-1 block">
                          Expiry Date
                        </label>
                        <Input
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="bg-white text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-ink-600 font-medium mb-1 block">
                          CVV
                        </label>
                        <Input
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="123"
                          className="bg-white text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className="space-y-3 bg-ink-50/60 p-4 rounded-xl border border-ink-100">
                    <label className="text-xs text-ink-600 font-medium mb-1 block">
                      Enter UPI ID or Phone Number
                    </label>
                    <Input
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@okaxis or username@upi"
                      className="bg-white text-xs"
                    />
                    <p className="text-[11px] text-ink-500">
                      A payment request will be sent to your UPI app.
                    </p>
                  </div>
                )}

                {/* Coupon Code Section */}
                <div className="pt-1 border-t border-ink-100">
                  <label className="text-xs font-semibold text-ink-700 block mb-2">
                    Have a Promo Code?
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 text-ink-400 absolute left-3 top-2.5" />
                      <Input
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Try LEARNLINK50 or FREEPASS"
                        className="pl-9 text-xs uppercase font-medium bg-white"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleApplyCoupon}
                      className="text-xs border-ink-300 hover:bg-brand-50 hover:text-brand-700"
                    >
                      Apply
                    </Button>
                  </div>
                  {couponApplied && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium mt-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Coupon applied: {appliedDiscount}% OFF!
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-[11px] text-ink-500 pt-2">
                  <Lock className="w-3.5 h-3.5 text-ink-400" />
                  <span>30-Day Money-Back Guarantee • Cancel anytime</span>
                </div>
              </div>

              {/* Right column: Order summary */}
              <div className="md:col-span-5 bg-ink-50 p-5 rounded-xl border border-ink-100 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-ink-900 text-sm mb-3">Order Summary</h3>

                  {/* Course Card Preview */}
                  <div className="flex gap-3 mb-4 bg-white p-2.5 rounded-lg border border-ink-100 shadow-sm">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-ink-900 line-clamp-2 leading-snug">
                        {course.title}
                      </h4>
                      <p className="text-[11px] text-brand-600 font-medium mt-1">
                        By {course.author?.name || "Expert"}
                      </p>
                      <p className="text-[10px] text-ink-500 mt-0.5">
                        {course.totalHours} • {course.lecturesCount} lectures
                      </p>
                    </div>
                  </div>

                  {/* Price calculations */}
                  <div className="space-y-2 text-xs border-t border-ink-200 pt-3 text-ink-600">
                    <div className="flex justify-between">
                      <span>Original Price:</span>
                      <span className="line-through text-ink-400">${originalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Course Discount:</span>
                      <span className="text-brand-600 font-medium">
                        -${(originalPrice - basePrice).toFixed(2)} ({course.discountPercent || 75}%)
                      </span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>Promo Discount ({appliedDiscount}%):</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs text-ink-500">
                      <span>Estimated Taxes:</span>
                      <span>$0.00</span>
                    </div>

                    <div className="border-t border-ink-200 pt-2.5 flex justify-between items-baseline font-bold text-sm text-ink-900">
                      <span>Total Amount:</span>
                      <span className="text-xl text-brand-600 font-display">
                        {finalPrice === 0 ? "FREE" : `$${finalPrice.toFixed(2)}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-4">
                  <Button
                    onClick={handleCompletePurchase}
                    disabled={isProcessing}
                    className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 text-sm shadow-md hover:shadow-glow transition-all"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing Secure Payment...
                      </>
                    ) : (
                      `Complete Purchase (${finalPrice === 0 ? "Free" : `$${finalPrice.toFixed(2)}`})`
                    )}
                  </Button>
                  <p className="text-[10px] text-center text-ink-400 mt-2">
                    By completing purchase you agree to Terms of Service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
