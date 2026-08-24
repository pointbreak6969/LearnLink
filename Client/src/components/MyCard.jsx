import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { BookOpen } from "lucide-react";
import { toast } from "sonner";

const MyCard = ({ id, name, admin, university, faculty, isJoined }) => {
  const navigate = useNavigate();
  const joinToclassroom = async () => {
    try {
      await classroomService.requestTojoin({ id });
      toast.success("Request to join classroom sent successfully");
    } catch (err) {
      toast.error(err.message || "Failed to request to join classroom");
    }
  };

  const handleClassroomAction = () => {
    if (isJoined) {
      navigate(`/classroom/${id}`);
    } else {
      joinToclassroom();
    }
  };

  return (
    <Card className="w-full flex flex-col justify-between h-full transition-all duration-300 hover:border-brand-300 hover:shadow-glow hover:-translate-y-1">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold truncate-multiline">
          {name}
        </CardTitle>
        <CardDescription>By {admin}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-between flex-grow pt-0">
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="text-xs font-medium bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full">{faculty}</span>
          <span className="text-xs font-medium bg-ink-100 text-ink-600 px-2.5 py-1 rounded-full">{university}</span>
        </div>

        <Button
          className="w-full mt-auto"
          onClick={handleClassroomAction}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          {isJoined ? "Enter Classroom" : "Join Classroom"}
        </Button>
      </CardContent>
    </Card>
  );
};
export default MyCard