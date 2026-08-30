import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Star, ArrowRight, CheckCircle2 } from "lucide-react";
import { getAllCourses } from "@/data/coursesData";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import courseService from "@/services/course";

const FewCourses = ({ showAll = false }) => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [enrolledIds, setEnrolledIds] = useState(new Set());

  const courses = getAllCourses();
  const displayedCourses = showAll ? courses : courses.slice(0, 6);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (authStatus && userData) {
        const enrollments = await courseService.getMyEnrolledCourses(
          userData._id || userData.id
        );
        setEnrolledIds(new Set(enrollments.map((e) => e.courseId)));
      } else {
        setEnrolledIds(new Set());
      }
    };
    fetchEnrollments();
  }, [authStatus, userData]);

  return (
    <div>
      <section className="py-24 bg-ink-50">
        <div className="container mx-auto px-6 md:px-16">
          <div className="text-center mb-8">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink-900">
              Our Courses
            </h2>
            <p className="text-lg text-ink-600 mt-4 max-w-2xl mx-auto">
              Explore a variety of courses designed to help you master new skills and excel in your field.
              Whether you are a beginner or an expert, we have something for everyone.
            </p>
          </div>

          {!showAll && (
            <div className="flex justify-end mb-8">
              <Link
                to="/courses"
                className="bg-brand-500 text-white font-semibold py-2.5 px-8 rounded-lg shadow-sm hover:bg-brand-600 hover:shadow-glow transition-all"
              >
                View All
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedCourses.map((course) => {
              const isEnrolled = enrolledIds.has(course.id);

              return (
                <Card
                  key={course.id}
                  className="overflow-hidden group transition-all duration-300 hover:border-brand-300 hover:shadow-glow hover:-translate-y-1 bg-white border border-ink-100 flex flex-col justify-between rounded-2xl cursor-pointer"
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  <div>
                    <div className="relative h-48 w-full overflow-hidden bg-ink-100">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-brand-700 shadow-sm flex items-center gap-1.5">
                        <course.icon className="h-3.5 w-3.5 text-brand-600" />
                        <span>{course.category}</span>
                      </div>

                      {isEnrolled ? (
                        <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Enrolled</span>
                        </div>
                      ) : (
                        course.badge && (
                          <div className="absolute top-3 right-3 bg-brand-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                            {course.badge}
                          </div>
                        )
                      )}
                    </div>

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

                      <h3 className="text-lg font-semibold text-ink-900 group-hover:text-brand-600 transition-colors line-clamp-1 mb-1">
                        {course.title}
                      </h3>

                      <p className="text-xs text-brand-600 font-medium mb-3">
                        By {course.author?.name}
                      </p>

                      <p className="text-ink-600 mb-4 leading-relaxed text-xs line-clamp-2">
                        {course.subtitle || course.description}
                      </p>

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

                  <div className="p-6 pt-0">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isEnrolled) {
                          navigate(`/courses/${course.id}/learn`);
                        } else {
                          navigate(`/courses/${course.id}`);
                        }
                      }}
                      className={`w-full font-semibold py-2.5 text-xs shadow-sm transition-all gap-1.5 ${
                        isEnrolled
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                          : "bg-brand-500 hover:bg-brand-600 text-white hover:shadow-glow"
                      }`}
                    >
                      <span>{isEnrolled ? "Continue Learning" : "Get It Now"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FewCourses;