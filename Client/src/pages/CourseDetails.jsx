import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Star,
  Clock,
  Globe,
  Award,
  Share2,
  Heart,
  PlayCircle,
  FileText,
  Check,
  ChevronDown,
  ChevronUp,
  Lock,
  Sparkles,
  Users,
  Tv,
  BookOpen,
  ArrowRight,
  MessageSquareQuote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { getCourseById, getAllCourses } from "@/data/coursesData";
import courseService from "@/services/course";
import CourseCheckoutModal from "@/components/CourseCheckoutModal";
import LecturePreviewModal from "@/components/LecturePreviewModal";

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  const course = getCourseById(courseId);
  const allCourses = getAllCourses();
  const relatedCourses = allCourses.filter((c) => c.id !== courseId).slice(0, 3);

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [expandedSections, setExpandedSections] = useState({ m1: true });
  const [previewLecture, setPreviewLecture] = useState(null);
  const [previewModuleTitle, setPreviewModuleTitle] = useState("");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Check enrollment status
  useEffect(() => {
    window.scrollTo(0, 0);
    const checkStatus = async () => {
      if (course && authStatus && userData) {
        const enrolled = await courseService.checkEnrollment(
          course.id,
          userData._id || userData.id
        );
        setIsEnrolled(enrolled);
      } else {
        setIsEnrolled(false);
      }
    };
    checkStatus();
  }, [course, authStatus, userData]);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-ink-50">
        <h2 className="font-display text-3xl font-bold text-ink-900 mb-2">Course Not Found</h2>
        <p className="text-ink-600 mb-6">The course you are looking for does not exist or has been moved.</p>
        <Button asChild className="bg-brand-500 hover:bg-brand-600 text-white">
          <Link to="/courses">Browse All Courses</Link>
        </Button>
      </div>
    );
  }

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAllSections = () => {
    const allExpanded = {};
    course.modules.forEach((m) => {
      allExpanded[m.id] = true;
    });
    setExpandedSections(allExpanded);
  };

  const collapseAllSections = () => {
    setExpandedSections({});
  };

  const areAllExpanded = course.modules.every((m) => expandedSections[m.id]);

  const handleBuyClick = () => {
    if (!authStatus) {
      setShowLoginPrompt(true);
      return;
    }
    if (isEnrolled) {
      navigate(`/courses/${course.id}/learn`);
      return;
    }
    setIsCheckoutOpen(true);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Course link copied to clipboard!");
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from Wishlist" : "Added to Wishlist!");
  };

  const handleOpenPreview = (lecture, moduleTitle) => {
    setPreviewLecture(lecture);
    setPreviewModuleTitle(moduleTitle);
  };

  return (
    <div className="min-h-screen bg-ink-50/50 pb-20">
      {/* Course Hero Banner (Udemy-like dark header with brand accents) */}
      <section className="bg-ink-900 text-white py-12 lg:py-16 relative overflow-hidden border-b border-ink-800">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/40 via-transparent to-black/60 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content Header */}
            <div className="lg:col-span-8 space-y-4">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs font-medium text-ink-300">
                <Link to="/" className="hover:text-brand-400 transition-colors">Home</Link>
                <span>/</span>
                <Link to="/courses" className="hover:text-brand-400 transition-colors">Courses</Link>
                <span>/</span>
                <span className="text-brand-300 truncate max-w-[200px] sm:max-w-none">{course.category}</span>
              </div>

              {/* Title & Tagline */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                {course.title}
              </h1>
              <p className="text-base sm:text-lg text-ink-200 leading-relaxed font-normal">
                {course.subtitle}
              </p>

              {/* Badges & Meta */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {course.badge && (
                  <Badge className="bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs px-3 py-1 border-0">
                    {course.badge}
                  </Badge>
                )}

                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm">
                  <span>{course.rating}</span>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.floor(course.rating || 5)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-amber-400/30 text-amber-400/40"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-ink-300 font-normal underline cursor-pointer hover:text-white">
                    ({course.reviewCount?.toLocaleString()} ratings)
                  </span>
                </div>

                <span className="text-xs text-ink-300 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-ink-400" />
                  {course.studentsEnrolled?.toLocaleString()} students
                </span>
              </div>

              {/* Author & Updates */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-ink-300 pt-2">
                <span>
                  Created by{" "}
                  <span className="text-brand-300 font-semibold underline cursor-pointer hover:text-white">
                    {course.author?.name}
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-ink-400" />
                  Last updated {course.lastUpdated}
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-ink-400" />
                  {course.language}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-ink-400">
                  <Tv className="w-3.5 h-3.5" />
                  Subtitles: {course.subtitles?.slice(0, 2).join(", ")}
                </span>
              </div>

              {/* Action shortcuts */}
              <div className="flex items-center gap-3 pt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleToggleWishlist}
                  className={`text-xs border-ink-700 bg-ink-800/80 hover:bg-ink-800 text-white gap-1.5 ${
                    isWishlisted ? "text-rose-400 border-rose-400/50" : ""
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-rose-400" : ""}`} />
                  <span>{isWishlisted ? "Wishlisted" : "Wishlist"}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="text-xs border-ink-700 bg-ink-800/80 hover:bg-ink-800 text-white gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </Button>
              </div>
            </div>

            {/* Empty space for desktop floating sidebar */}
            <div className="lg:col-span-4 hidden lg:block" />
          </div>
        </div>
      </section>

      {/* Main Body + Sticky Purchase Sidebar */}
      <div className="container mx-auto px-4 md:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Main Course Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Mobile Buy Card (Visible only on small screens) */}
            <div className="lg:hidden bg-white p-5 rounded-2xl border border-ink-100 shadow-sm space-y-4">
              <div className="relative rounded-xl overflow-hidden aspect-video bg-ink-900 group">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div
                  onClick={() => {
                    const firstPreview = course.modules[0]?.lectures.find((l) => l.isPreviewable);
                    if (firstPreview) handleOpenPreview(firstPreview, course.modules[0].title);
                  }}
                  className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center cursor-pointer hover:bg-black/50 transition-colors"
                >
                  <PlayCircle className="w-14 h-14 text-white drop-shadow-md" />
                  <span className="text-white text-xs font-semibold mt-1">Preview this course</span>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold font-display text-ink-900">
                  ${course.price}
                </span>
                <span className="text-sm text-ink-400 line-through">
                  ${course.originalPrice}
                </span>
                <Badge variant="secondary" className="bg-brand-50 text-brand-700 font-bold text-xs">
                  {course.discountPercent}% OFF
                </Badge>
              </div>

              {isEnrolled ? (
                <Button
                  onClick={() => navigate(`/courses/${course.id}/learn`)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Go to Course (Enrolled)</span>
                </Button>
              ) : (
                <Button
                  onClick={handleBuyClick}
                  className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 gap-2 shadow-sm"
                >
                  <Lock className="w-4 h-4" />
                  <span>{authStatus ? "Buy Now" : "Log in to Purchase"}</span>
                </Button>
              )}
            </div>

            {/* "What you'll learn" Box */}
            <div className="bg-white border border-ink-100 rounded-2xl p-6 md:p-8 shadow-card">
              <h2 className="font-display text-2xl font-bold text-ink-900 mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-500" />
                What you&apos;ll learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.whatYouWillLearn?.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-sm text-ink-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content / Curriculum / Modules Accordion */}
            <div className="bg-white border border-ink-100 rounded-2xl p-6 md:p-8 shadow-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink-900">Course Content</h2>
                  <p className="text-xs text-ink-500 mt-1">
                    {course.modules?.length} sections • {course.lecturesCount} lectures • {course.totalHours}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={areAllExpanded ? collapseAllSections : expandAllSections}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors self-start sm:self-auto"
                >
                  {areAllExpanded ? "Collapse all sections" : "Expand all sections"}
                </button>
              </div>

              {/* Sections Accordion */}
              <div className="space-y-3">
                {course.modules?.map((module) => {
                  const isOpen = !!expandedSections[module.id];
                  return (
                    <div
                      key={module.id}
                      className="border border-ink-100 rounded-xl overflow-hidden bg-ink-50/40 transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleSection(module.id)}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-ink-100/60 transition-colors"
                      >
                        <div className="flex items-center gap-3 pr-4">
                          <div className="text-ink-400">
                            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                          <span className="font-semibold text-sm text-ink-900">
                            {module.title}
                          </span>
                        </div>
                        <div className="text-xs text-ink-500 flex-shrink-0">
                          {module.lectures?.length} lectures • {module.duration}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="bg-white border-t border-ink-100 divide-y divide-ink-50">
                          {module.lectures?.map((lecture, lIdx) => (
                            <div
                              key={lecture.id || lIdx}
                              className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-ink-50/50 transition-colors"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                {lecture.type === "video" ? (
                                  <PlayCircle className="w-4 h-4 text-ink-400 flex-shrink-0" />
                                ) : (
                                  <FileText className="w-4 h-4 text-ink-400 flex-shrink-0" />
                                )}
                                <span className="text-xs sm:text-sm text-ink-800 truncate">
                                  {lecture.title}
                                </span>
                              </div>

                              <div className="flex items-center gap-3 flex-shrink-0">
                                {lecture.isPreviewable && !isEnrolled && (
                                  <button
                                    type="button"
                                    onClick={() => handleOpenPreview(lecture, module.title)}
                                    className="text-xs font-semibold text-brand-600 hover:text-brand-700 underline"
                                  >
                                    Preview
                                  </button>
                                )}
                                <span className="text-xs text-ink-400 font-mono">
                                  {lecture.duration}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Requirements & Prerequisites */}
            <div className="bg-white border border-ink-100 rounded-2xl p-6 md:p-8 shadow-card">
              <h2 className="font-display text-2xl font-bold text-ink-900 mb-4">Requirements</h2>
              <ul className="space-y-2.5">
                {course.requirements?.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-ink-700">
                    <span className="text-brand-500 font-bold">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Course Description */}
            <div className="bg-white border border-ink-100 rounded-2xl p-6 md:p-8 shadow-card space-y-4">
              <h2 className="font-display text-2xl font-bold text-ink-900">Description</h2>
              <p className="text-sm text-ink-700 leading-relaxed whitespace-pre-line">
                {course.description}
              </p>

              <div className="pt-4 border-t border-ink-100">
                <h3 className="font-semibold text-ink-900 text-sm mb-3">Who this course is for:</h3>
                <ul className="space-y-2">
                  {course.targetAudience?.map((aud, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-ink-600">
                      <span className="text-brand-500 font-bold">•</span>
                      <span>{aud}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Instructor Bio Section */}
            <div className="bg-white border border-ink-100 rounded-2xl p-6 md:p-8 shadow-card space-y-6">
              <h2 className="font-display text-2xl font-bold text-ink-900">Instructor</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-brand-600 font-display">
                    {course.author?.name}
                  </h3>
                  <p className="text-sm text-ink-600">{course.author?.title}</p>
                </div>

                <div className="flex items-center gap-6 flex-wrap">
                  <img
                    src={course.author?.avatar}
                    alt={course.author?.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-brand-200"
                  />
                  <div className="space-y-1.5 text-xs text-ink-700">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>{course.author?.rating} Instructor Rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-brand-500" />
                      <span>{course.author?.reviewsCount || "12,500+"} Reviews</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-brand-500" />
                      <span>{course.author?.studentsCount?.toLocaleString()} Students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PlayCircle className="w-4 h-4 text-brand-500" />
                      <span>{course.author?.coursesCount} Courses</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-ink-600 leading-relaxed pt-2">
                  {course.author?.bio}
                </p>
              </div>
            </div>

            {/* Student Feedback & Reviews */}
            <div className="bg-white border border-ink-100 rounded-2xl p-6 md:p-8 shadow-card space-y-6">
              <h2 className="font-display text-2xl font-bold text-ink-900 flex items-center gap-2">
                <MessageSquareQuote className="w-5 h-5 text-brand-500" />
                Student Reviews & Feedback
              </h2>

              <div className="flex flex-col sm:flex-row items-center gap-8 bg-brand-50/50 p-6 rounded-xl border border-brand-100">
                <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
                  <div className="text-5xl font-display font-bold text-brand-700">
                    {course.rating}
                  </div>
                  <div className="flex items-center gap-1 my-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.floor(course.rating || 5)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-amber-400/30 text-amber-400/40"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-ink-500 font-medium">Course Rating</p>
                </div>

                <div className="flex-1 w-full space-y-1.5 text-xs text-ink-600">
                  <div className="flex items-center gap-2">
                    <span className="w-12">5 stars</span>
                    <div className="flex-1 bg-ink-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-500 h-full w-[82%]" />
                    </div>
                    <span className="w-8 text-right font-medium">82%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12">4 stars</span>
                    <div className="flex-1 bg-ink-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-500 h-full w-[14%]" />
                    </div>
                    <span className="w-8 text-right font-medium">14%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12">3 stars</span>
                    <div className="flex-1 bg-ink-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-500 h-full w-[3%]" />
                    </div>
                    <span className="w-8 text-right font-medium">3%</span>
                  </div>
                </div>
              </div>

              {/* Review Cards */}
              <div className="divide-y divide-ink-100">
                {course.reviews?.map((review) => (
                  <div key={review.id} className="py-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={review.avatar}
                          alt={review.author}
                          className="w-10 h-10 rounded-full object-cover border border-ink-200"
                        />
                        <div>
                          <p className="text-sm font-semibold text-ink-900">{review.author}</p>
                          <div className="flex items-center gap-1.5">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-3 h-3 ${
                                    star <= Math.round(Number(review.rating) || 5)
                                      ? "fill-amber-400 text-amber-400"
                                      : "fill-amber-400/20 text-amber-400/30"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-[11px] text-ink-400">{review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-ink-700 leading-relaxed pl-13">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related courses */}
            {relatedCourses.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="font-display text-xl font-bold text-ink-900">
                  Students Also Bought
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedCourses.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/courses/${rel.id}`}
                      className="bg-white rounded-xl border border-ink-100 overflow-hidden hover:shadow-card hover:border-brand-200 transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-video relative overflow-hidden bg-ink-100">
                          <img
                            src={rel.image}
                            alt={rel.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-3.5">
                          <h4 className="text-xs font-bold text-ink-900 line-clamp-2 group-hover:text-brand-600 transition-colors">
                            {rel.title}
                          </h4>
                          <p className="text-[11px] text-ink-500 mt-1">
                            {rel.author?.name}
                          </p>
                        </div>
                      </div>
                      <div className="p-3.5 pt-0 flex items-baseline justify-between">
                        <span className="text-sm font-bold text-ink-900">${rel.price}</span>
                        <span className="text-[11px] text-brand-600 font-semibold">View Course</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sticky Purchase Sidebar (Udemy Signature Card) */}
          <div className="lg:col-span-4 hidden lg:block sticky top-24">
            <div className="bg-white rounded-2xl border border-ink-100 shadow-2xl overflow-hidden">
              {/* Preview image */}
              <div className="relative aspect-video bg-ink-900 group cursor-pointer overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  onClick={() => {
                    const firstPreview = course.modules[0]?.lectures.find((l) => l.isPreviewable);
                    if (firstPreview) handleOpenPreview(firstPreview, course.modules[0].title);
                  }}
                  className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center group-hover:bg-black/50 transition-colors"
                >
                  <PlayCircle className="w-16 h-16 text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
                  <span className="text-white text-xs font-semibold mt-2 tracking-wide">
                    Preview this course
                  </span>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="p-6 space-y-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-display font-bold text-ink-900">
                    ${course.price}
                  </span>
                  <span className="text-sm text-ink-400 line-through">
                    ${course.originalPrice}
                  </span>
                  <Badge variant="secondary" className="bg-brand-50 text-brand-700 font-bold text-xs">
                    {course.discountPercent}% OFF
                  </Badge>
                </div>

                <div className="text-xs text-rose-600 font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>2 days left at this price!</span>
                </div>

                {isEnrolled ? (
                  <div className="space-y-2">
                    <Button
                      onClick={() => navigate(`/courses/${course.id}/learn`)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 text-sm gap-2 shadow-md"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Continue Learning</span>
                    </Button>
                    <p className="text-[11px] text-center text-emerald-700 font-medium">
                      ✓ You are enrolled in this course
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    <Button
                      onClick={handleBuyClick}
                      className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3.5 text-sm shadow-glow transition-all gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      <span>{authStatus ? "Buy Now" : "Log in to Purchase"}</span>
                    </Button>
                    {!authStatus && (
                      <p className="text-[11px] text-center text-ink-500">
                        Login required to complete enrollment
                      </p>
                    )}
                  </div>
                )}

                <p className="text-[11px] text-center text-ink-500 pt-1 border-t border-ink-100">
                  30-Day Money-Back Guarantee
                </p>

                {/* Course Includes Checklist */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-ink-900 uppercase tracking-wider">
                    This course includes:
                  </h4>
                  <ul className="space-y-2.5 text-xs text-ink-700">
                    <li className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-brand-600 flex-shrink-0" />
                      <span>{course.totalHours} on-demand video</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-brand-600 flex-shrink-0" />
                      <span>{course.articlesCount} articles & cheat sheets</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <BookOpen className="w-4 h-4 text-brand-600 flex-shrink-0" />
                      <span>{course.downloadableResourcesCount} downloadable resources</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Tv className="w-4 h-4 text-brand-600 flex-shrink-0" />
                      <span>Access on mobile and TV</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Award className="w-4 h-4 text-brand-600 flex-shrink-0" />
                      <span>Certificate of Completion</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Prompt Modal when logged-out user attempts to purchase */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-ink-100 text-center animate-fade-in">
            <div className="w-14 h-14 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl font-bold text-ink-900 mb-2">
              Login Required
            </h3>
            <p className="text-xs sm:text-sm text-ink-600 mb-6">
              You must be logged in to purchase{" "}
              <span className="font-semibold text-ink-900">{course.title}</span> and track your certificates and course progress.
            </p>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => navigate(`/login?redirect=/courses/${course.id}`)}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 gap-2"
              >
                <span>Log In to Your Account</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate(`/signup?redirect=/courses/${course.id}`)}
                className="w-full border-ink-200"
              >
                Create New Account
              </Button>
              <button
                type="button"
                onClick={() => setShowLoginPrompt(false)}
                className="text-xs text-ink-500 hover:text-ink-700 pt-2"
              >
                Cancel & Continue Browsing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <CourseCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        course={course}
        user={userData}
        onSuccess={() => {
          setIsEnrolled(true);
        }}
      />

      {/* Lecture Free Preview Modal */}
      <LecturePreviewModal
        isOpen={!!previewLecture}
        onClose={() => setPreviewLecture(null)}
        lecture={previewLecture}
        moduleTitle={previewModuleTitle}
        courseTitle={course.title}
        isEnrolled={isEnrolled}
        onBuyClick={handleBuyClick}
      />
    </div>
  );
}
