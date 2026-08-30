import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Search,
  BookOpen,
  Sparkles,
  Star,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAllCourses, getCourseById } from "@/data/coursesData";
import courseService from "@/services/course";

export default function AllCourses() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [enrolledList, setEnrolledList] = useState([]);

  const allCourses = getAllCourses();

  // Load enrolled courses for logged in user
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchEnrollments = async () => {
      if (authStatus && userData) {
        const enrollments = await courseService.getMyEnrolledCourses(
          userData._id || userData.id
        );
        setEnrolledList(enrollments || []);
      } else {
        setEnrolledList([]);
      }
    };
    fetchEnrollments();
  }, [authStatus, userData]);

  const enrolledCourseIds = useMemo(
    () => new Set(enrolledList.map((e) => e.courseId)),
    [enrolledList]
  );

  // Map enrolled records to full course objects
  const myEnrolledCourses = useMemo(() => {
    return enrolledList
      .map((enrollment) => {
        const course = getCourseById(enrollment.courseId);
        if (!course) return null;
        return {
          ...course,
          enrollment,
        };
      })
      .filter(Boolean);
  }, [enrolledList]);

  // Categories list
  const categories = [
    "All",
    "Web Development",
    "Programming",
    "Data Science",
    "Mobile Apps",
    "UI/UX Design",
    "Cloud & DevOps",
    "Cybersecurity",
    "AI & Robotics",
  ];

  // Filtered courses for browsing
  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.author?.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allCourses, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-ink-50/50">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-brand-50 via-white to-ink-50/50 py-16 border-b border-ink-100">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-brand-100/70 border border-brand-200 text-brand-800 text-xs font-semibold px-4 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Master Industry-Ready Skills with LearnLink</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 tracking-tight text-balance">
            Explore Premium Courses
          </h1>

          <p className="text-base md:text-lg text-ink-600 max-w-2xl mx-auto leading-relaxed">
            Gain in-demand skills from industry experts. Choose from programming, web development, data science, AI, cloud architecture, and UI/UX design.
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto relative pt-2">
            <Search className="w-5 h-5 text-ink-400 absolute left-4 top-5" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, topics, instructors..."
              className="pl-12 pr-4 py-6 text-sm bg-white border-ink-200 rounded-xl shadow-sm focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-brand-500 text-white shadow-sm ring-2 ring-brand-400/30"
                    : "bg-white text-ink-700 border border-ink-200 hover:border-brand-300 hover:bg-brand-50/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 md:px-8 py-12 max-w-7xl space-y-12">
        {/* LOGGED IN USER: "My Enrolled Courses" Section */}
        {authStatus && (
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-ink-100 shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink-100 pb-5">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-ink-900">
                      My Learning & Enrolled Courses
                    </h2>
                    <p className="text-xs text-ink-500 mt-0.5">
                      Welcome back, <span className="font-semibold text-ink-800">{userData?.fullName || "Learner"}</span>! Continue where you left off.
                    </p>
                  </div>
                </div>
              </div>

              {myEnrolledCourses.length > 0 && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold text-xs px-3 py-1">
                    {myEnrolledCourses.length} {myEnrolledCourses.length === 1 ? "Course Enrolled" : "Courses Enrolled"}
                  </Badge>
                </div>
              )}
            </div>

            {myEnrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myEnrolledCourses.map((course) => {
                  const progress = course.enrollment?.progress || 0;
                  return (
                    <Card
                      key={course.id}
                      className="overflow-hidden border border-ink-200 bg-white rounded-xl hover:border-brand-300 hover:shadow-card transition-all flex flex-col justify-between group"
                    >
                      <div>
                        {/* Thumbnail */}
                        <div className="relative aspect-video bg-ink-100 overflow-hidden">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2.5 left-2.5 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Enrolled</span>
                          </div>
                        </div>

                        {/* Card Info */}
                        <div className="p-5 space-y-3">
                          <div className="text-[11px] font-semibold text-brand-600">
                            {course.category}
                          </div>
                          <h3 className="font-bold text-base text-ink-900 line-clamp-1 group-hover:text-brand-600 transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-xs text-ink-500">
                            By {course.author?.name}
                          </p>

                          {/* Progress bar */}
                          <div className="pt-2 space-y-1.5">
                            <div className="flex justify-between text-[11px] text-ink-600 font-medium">
                              <span>Course Progress</span>
                              <span className="font-bold text-brand-600">{progress}%</span>
                            </div>
                            <div className="w-full bg-ink-100 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-brand-500 h-full rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Action */}
                      <div className="p-5 pt-0">
                        <Button
                          onClick={() => navigate(`/courses/${course.id}/learn`)}
                          className="w-full bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold py-2.5 gap-2 shadow-sm"
                        >
                          <PlayCircle className="w-4 h-4" />
                          <span>{progress > 0 ? "Continue Learning" : "Start Learning"}</span>
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10 bg-brand-50/40 rounded-xl border border-dashed border-brand-200 p-6 space-y-3">
                <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-ink-900">
                  You haven&apos;t enrolled in any courses yet
                </h3>
                <p className="text-xs text-ink-600 max-w-md mx-auto">
                  Browse our top-rated courses below. Click &quot;Get It Now&quot; to review the complete syllabus, modules, and enroll with 1-click!
                </p>
              </div>
            )}
          </section>
        )}

        {/* ALL COURSES / CATALOG SECTION (Buying options available) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-ink-900">
                {selectedCategory === "All" ? "All Available Courses" : `${selectedCategory} Courses`}
              </h2>
              <p className="text-xs text-ink-500 mt-1">
                Showing {filteredCourses.length} courses • Lifetime access & Certificates included
              </p>
            </div>

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs text-brand-600 font-semibold hover:underline self-start sm:self-auto"
              >
                Clear search filter
              </button>
            )}
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => {
              const isEnrolled = enrolledCourseIds.has(course.id);

              return (
                <Card
                  key={course.id}
                  className="overflow-hidden group transition-all duration-300 hover:border-brand-300 hover:shadow-glow hover:-translate-y-1 bg-white border border-ink-100 flex flex-col justify-between rounded-2xl"
                >
                  <div>
                    {/* Course Thumbnail */}
                    <div className="relative h-48 w-full overflow-hidden bg-ink-100">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Category Pill */}
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-brand-700 shadow-sm flex items-center gap-1.5">
                        <course.icon className="h-3.5 w-3.5 text-brand-600" />
                        <span>{course.category}</span>
                      </div>

                      {/* Badge (Bestseller / Enrolled) */}
                      {isEnrolled ? (
                        <div className="absolute top-3 right-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Enrolled</span>
                        </div>
                      ) : (
                        course.badge && (
                          <div className="absolute top-3 right-3 bg-brand-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                            {course.badge}
                          </div>
                        )
                      )}
                    </div>

                    {/* Card Content */}
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center text-amber-500 font-bold text-xs">
                          <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                          <span>{course.rating}</span>
                        </div>
                        <span className="text-[11px] text-ink-400">
                          ({course.reviewCount?.toLocaleString()} reviews)
                        </span>
                        <span className="text-ink-300">•</span>
                        <span className="text-[11px] text-ink-500">
                          {course.totalHours}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-ink-900 group-hover:text-brand-600 transition-colors line-clamp-1 mb-1">
                        {course.title}
                      </h3>

                      <p className="text-xs text-brand-600 font-medium mb-3">
                        By {course.author?.name}
                      </p>

                      <p className="text-ink-600 mb-4 leading-relaxed text-xs line-clamp-2">
                        {course.subtitle || course.description}
                      </p>

                      {/* Price tag */}
                      <div className="flex items-baseline gap-2 pt-2 border-t border-ink-100">
                        <span className="text-xl font-bold font-display text-ink-900">
                          ${course.price}
                        </span>
                        <span className="text-xs text-ink-400 line-through">
                          ${course.originalPrice}
                        </span>
                        <span className="text-xs text-brand-600 font-bold ml-auto">
                          {course.discountPercent}% OFF
                        </span>
                      </div>
                    </CardContent>
                  </div>

                  {/* CTA Buttons */}
                  <div className="p-6 pt-0">
                    {isEnrolled ? (
                      <div className="space-y-2">
                        <Button
                          onClick={() => navigate(`/courses/${course.id}/learn`)}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 text-xs gap-2"
                        >
                          <PlayCircle className="w-4 h-4" />
                          <span>Continue Learning</span>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => navigate(`/courses/${course.id}`)}
                          className="w-full border-ink-200 text-xs py-2 text-ink-700 hover:bg-ink-50"
                        >
                          View Details & Modules
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => navigate(`/courses/${course.id}`)}
                        className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-2.5 text-xs shadow-sm hover:shadow-glow transition-all gap-1.5"
                      >
                        <span>Get It Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-ink-100 p-8 space-y-4">
              <BookOpen className="w-12 h-12 text-ink-300 mx-auto" />
              <h3 className="font-display text-xl font-bold text-ink-900">
                No courses found
              </h3>
              <p className="text-xs text-ink-500 max-w-sm mx-auto">
                No courses matched your query &quot;{searchQuery}&quot;. Try adjusting your keywords or category filter.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}