import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, FileText, CheckCircle2, Lock, Sparkles } from "lucide-react";

export default function LecturePreviewModal({
  isOpen,
  onClose,
  lecture,
  moduleTitle,
  courseTitle,
  onBuyClick,
  isEnrolled,
}) {
  if (!lecture) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white rounded-2xl border border-ink-100 shadow-2xl">
        <DialogHeader className="p-5 bg-ink-900 text-white">
          <div className="flex items-center gap-2 text-xs text-brand-400 font-medium mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Course Free Preview</span>
          </div>
          <DialogTitle className="text-lg md:text-xl font-bold font-display text-white">
            {lecture.title}
          </DialogTitle>
          <DialogDescription className="text-ink-300 text-xs">
            {moduleTitle} • {courseTitle}
          </DialogDescription>
        </DialogHeader>

        {/* Video / Interactive Player View */}
        <div className="bg-black relative aspect-video flex flex-col items-center justify-center text-white overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-between p-6">
            <div className="flex justify-between items-center">
              <span className="bg-brand-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Preview Mode
              </span>
              <span className="text-xs text-ink-300 font-mono">
                Duration: {lecture.duration}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center my-auto">
              <div className="w-16 h-16 rounded-full bg-brand-500/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-brand-500 transition-all cursor-pointer">
                <Play className="w-7 h-7 fill-white ml-1" />
              </div>
              <p className="text-sm font-medium mt-3 text-ink-200">
                Click to play sample lesson
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-ink-300">
              <span>HD 1080p • English Audio & Subtitles</span>
              <span className="text-brand-300 font-medium">LearnLink Interactive Player</span>
            </div>
          </div>
        </div>

        {/* Bottom details & Next steps */}
        <div className="p-5 bg-ink-50/70 border-t border-ink-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-ink-700">
            {lecture.type === "video" ? (
              <Play className="w-4 h-4 text-brand-600" />
            ) : (
              <FileText className="w-4 h-4 text-brand-600" />
            )}
            <span>This free preview provides a quick look into the core topic.</span>
          </div>

          {!isEnrolled ? (
            <Button
              onClick={() => {
                onClose();
                if (onBuyClick) onBuyClick();
              }}
              className="bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs px-5 py-2.5 gap-1.5 shadow-sm"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Enroll to Unlock Full Course</span>
            </Button>
          ) : (
            <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>You own full access to this course</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
