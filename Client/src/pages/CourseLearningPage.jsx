import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Play,
  CheckCircle2,
  Circle,
  FileText,
  Award,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getCourseById } from "@/data/coursesData";
import courseService from "@/services/course";

export default function CourseLearningPage() {
  const { courseId } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const course = getCourseById(courseId);

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLectureIndex, setActiveLectureIndex] = useState(0);
  const [completedLectures, setCompletedLectures] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "notes" | "resources"

  // Load progress
  useEffect(() => {
    window.scrollTo(0, 0);
    const loadData = async () => {
      if (!course) {
        setIsLoading(false);
        return;
      }

      if (userData) {
        const enrollments = await courseService.getMyEnrolledCourses(userData._id || userData.id);
        const myEnrollment = enrollments.find((e) => e.courseId === course.id);
        if (myEnrollment?.completedLectures) {
          setCompletedLectures(new Set(myEnrollment.completedLectures));
        }
      }
      setIsLoading(false);
    };

    loadData();
  }, [course, userData]);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-display text-2xl font-bold text-ink-900 mb-2">Course Not Found</h2>
        <Button asChild>
          <Link to="/courses">Browse Courses</Link>
        </Button>
      </div>
    );
  }

  // Calculate total lectures & progress
  const allLectures = course.modules.flatMap((m, mIdx) =>
    m.lectures.map((l, lIdx) => ({ ...l, moduleIndex: mIdx, lectureIndex: lIdx, moduleTitle: m.title }))
  );
  const totalLecturesCount = allLectures.length;
  const progressPercent = totalLecturesCount > 0
    ? Math.min(100, Math.round((completedLectures.size / totalLecturesCount) * 100))
    : 0;

  const currentModule = course.modules[activeModuleIndex] || course.modules[0];
  const currentLecture = currentModule?.lectures[activeLectureIndex] || currentModule?.lectures[0];

  const currentOverallIndex = allLectures.findIndex(
    (l) => l.moduleIndex === activeModuleIndex && l.lectureIndex === activeLectureIndex
  );

  const toggleLectureCompleted = async (lectureId) => {
    const nextSet = new Set(completedLectures);
    const isNowCompleted = !nextSet.has(lectureId);

    if (isNowCompleted) {
      nextSet.add(lectureId);
      toast.success("Lecture marked as complete! 🎉");
    } else {
      nextSet.delete(lectureId);
    }

    setCompletedLectures(nextSet);

    if (userData) {
      await courseService.updateProgress(course.id, {
        lectureId,
        totalLectures: totalLecturesCount,
        isCompleted: isNowCompleted,
        userId: userData._id || userData.id,
      });
    }
  };

  const handleNextLecture = () => {
    if (currentOverallIndex < allLectures.length - 1) {
      const next = allLectures[currentOverallIndex + 1];
      setActiveModuleIndex(next.moduleIndex);
      setActiveLectureIndex(next.lectureIndex);
      setIsPlaying(true);
    }
  };

  const handlePrevLecture = () => {
    if (currentOverallIndex > 0) {
      const prev = allLectures[currentOverallIndex - 1];
      setActiveModuleIndex(prev.moduleIndex);
      setActiveLectureIndex(prev.lectureIndex);
      setIsPlaying(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-900 text-white flex flex-col">
      {/* Top Learning Bar */}
      <header className="bg-ink-950 border-b border-ink-800 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4 min-w-0">
          <Link
            to="/courses"
            className="flex items-center gap-1.5 text-xs text-ink-300 hover:text-white transition-colors bg-ink-800/80 px-2.5 py-1.5 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Courses</span>
          </Link>
          <div className="border-l border-ink-800 pl-4 min-w-0">
            <h1 className="text-sm font-semibold text-white truncate max-w-md">
              {course.title}
            </h1>
            <p className="text-[11px] text-brand-400 truncate">
              {currentModule?.title} • {currentLecture?.title}
            </p>
          </div>
        </div>

        {/* Progress & Certificate status */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="text-ink-300 font-medium">Your Progress:</span>
            <div className="w-28 bg-ink-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-brand-500 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-bold text-brand-400">{progressPercent}%</span>
          </div>

          {progressPercent === 100 ? (
            <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs px-3 py-1.5 rounded-full font-bold animate-pulse">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Certificate Ready!</span>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-1 text-[11px] text-ink-400">
              <Award className="w-3.5 h-3.5" />
              <span>Complete all lectures for certificate</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Learning Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Side: Video Player & Content (8 cols) */}
        <div className="lg:col-span-8 flex flex-col bg-black overflow-y-auto max-h-[calc(100vh-60px)]">
          {/* Video Player Container */}
          <div className="relative aspect-video bg-ink-950 flex flex-col items-center justify-center border-b border-ink-800 group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-between p-6">
              <div className="flex justify-between items-center">
                <span className="bg-brand-500/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Lesson {currentOverallIndex + 1} of {totalLecturesCount}
                </span>
                <span className="text-xs text-ink-300 font-mono">
                  {currentLecture?.duration}
                </span>
              </div>

              {/* Center Play Button */}
              <div className="flex flex-col items-center justify-center my-auto cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
                <div className="w-20 h-20 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  <Play className="w-9 h-9 fill-white ml-1" />
                </div>
                <p className="text-sm font-semibold mt-4 text-white">
                  {isPlaying ? "Playing Lesson..." : `Click to Play: ${currentLecture?.title}`}
                </p>
              </div>

              {/* Bottom Player Controls */}
              <div className="flex items-center justify-between text-xs text-ink-300 pt-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrevLecture}
                    disabled={currentOverallIndex === 0}
                    className="hover:text-white disabled:opacity-30 flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                  <button
                    onClick={handleNextLecture}
                    disabled={currentOverallIndex === allLectures.length - 1}
                    className="hover:text-white disabled:opacity-30 flex items-center gap-1"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <Button
                  size="sm"
                  onClick={() => toggleLectureCompleted(currentLecture?.id)}
                  className={`text-xs gap-1.5 ${
                    completedLectures.has(currentLecture?.id)
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-brand-500 hover:bg-brand-600 text-white"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {completedLectures.has(currentLecture?.id)
                      ? "Completed ✓"
                      : "Mark as Complete"}
                  </span>
                </Button>
              </div>
            </div>
          </div>

          {/* Lesson Tabs & Description */}
          <div className="p-6 bg-ink-900 flex-1 space-y-6">
            <div className="flex items-center gap-4 border-b border-ink-800 pb-3 text-sm">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`font-semibold pb-2 border-b-2 transition-colors ${
                  activeTab === "overview"
                    ? "border-brand-500 text-brand-400"
                    : "border-transparent text-ink-400 hover:text-white"
                }`}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("notes")}
                className={`font-semibold pb-2 border-b-2 transition-colors ${
                  activeTab === "notes"
                    ? "border-brand-500 text-brand-400"
                    : "border-transparent text-ink-400 hover:text-white"
                }`}
              >
                Lesson Notes
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("resources")}
                className={`font-semibold pb-2 border-b-2 transition-colors ${
                  activeTab === "resources"
                    ? "border-brand-500 text-brand-400"
                    : "border-transparent text-ink-400 hover:text-white"
                }`}
              >
                Resources & Downloads
              </button>
            </div>

            {activeTab === "overview" && (
              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold text-white">
                  About this Lesson
                </h3>
                <p className="text-sm text-ink-300 leading-relaxed">
                  In this session, you will learn the core concepts behind{" "}
                  <span className="text-brand-300 font-semibold">{currentLecture?.title}</span>.
                  Make sure to practice the code examples alongside the video.
                </p>
                <div className="bg-ink-950 p-4 rounded-xl border border-ink-800 space-y-2">
                  <h4 className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                    Key Takeaways
                  </h4>
                  <ul className="text-xs text-ink-300 space-y-1.5 list-disc list-inside">
                    <li>Practical hands-on implementation</li>
                    <li>Best design patterns and industry standards</li>
                    <li>Avoid common pitfalls and performance bottlenecks</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="space-y-3">
                <h3 className="font-display text-lg font-bold text-white">
                  Instructor Notes
                </h3>
                <div className="bg-ink-950 p-4 rounded-xl border border-ink-800 text-xs text-ink-300 font-mono leading-relaxed">
                  {"// Example code snippet for this lecture"}<br />
                  const learnlinkMastery = async () =&gt; &#123;<br />
                  &nbsp;&nbsp;console.log(&quot;Mastering {course.category}&quot;);<br />
                  &#125;;
                </div>
              </div>
            )}

            {activeTab === "resources" && (
              <div className="space-y-3">
                <h3 className="font-display text-lg font-bold text-white">
                  Downloadable Files
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-ink-950 rounded-lg border border-ink-800 text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-brand-400" />
                      <span>CheatSheet_{course.id}.pdf</span>
                    </div>
                    <Button size="sm" variant="ghost" className="text-xs text-brand-400 hover:text-brand-300 gap-1">
                      <Download className="w-3.5 h-3.5" /> Download
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Course Curriculum Sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-ink-950 border-l border-ink-800 overflow-y-auto max-h-[calc(100vh-60px)]">
          <div className="p-4 border-b border-ink-800 bg-ink-900 sticky top-0 z-10">
            <h2 className="font-semibold text-sm text-white">Course Curriculum</h2>
            <p className="text-[11px] text-ink-400 mt-0.5">
              {completedLectures.size} of {totalLecturesCount} completed ({progressPercent}%)
            </p>
          </div>

          <div className="divide-y divide-ink-800">
            {course.modules.map((module, mIdx) => (
              <div key={module.id} className="p-3">
                <h3 className="text-xs font-bold text-ink-300 uppercase tracking-wider mb-2">
                  {module.title}
                </h3>
                <div className="space-y-1">
                  {module.lectures.map((lecture, lIdx) => {
                    const isCurrent =
                      activeModuleIndex === mIdx && activeLectureIndex === lIdx;
                    const isDone = completedLectures.has(lecture.id);

                    return (
                      <div
                        key={lecture.id}
                        onClick={() => {
                          setActiveModuleIndex(mIdx);
                          setActiveLectureIndex(lIdx);
                          setIsPlaying(true);
                        }}
                        className={`w-full p-2.5 rounded-lg flex items-center justify-between gap-3 text-left transition-all cursor-pointer ${
                          isCurrent
                            ? "bg-brand-500/20 text-brand-300 border border-brand-500/40"
                            : "hover:bg-ink-900 text-ink-200"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLectureCompleted(lecture.id);
                            }}
                            className="text-ink-400 hover:text-emerald-400 transition-colors"
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                            ) : (
                              <Circle className="w-4 h-4 text-ink-500" />
                            )}
                          </button>
                          <span className="text-xs truncate">{lecture.title}</span>
                        </div>
                        <span className="text-[10px] text-ink-400 font-mono flex-shrink-0">
                          {lecture.duration}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
