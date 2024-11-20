import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { BookOpen } from "lucide-react";
const MyCard = ({ id, name, admin, university, faculty }) => {
  const navigate = useNavigate();
  return (
    <>
      <Card className="bg-white shadow-lg border border-slate-200 rounded-3xl flex flex-col justify-around max-h-64 h-full">
        <CardHeader>
          <CardTitle className="text-lg font-bold">{name}</CardTitle>
          <CardDescription>By: {admin}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          <p className="text-sm mb-2">{faculty}</p>
          <p className="text-sm mb-2">{university}</p>

          <Button
            className="w-full bg-orange-500 hover:bg-slate-900/90 transition-all duration-300 text-white"
            onClick={() => {
              navigate(`/classroom/${id}`);
            }}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Enter Classroom
          </Button>
        </CardContent>
      </Card>
    </>
  );
};
export default MyCard;
