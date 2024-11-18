import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { BookOpen } from "lucide-react";
const MyCard = ({  id,name, teacher, description}) => {
  return (
    <>
      <Card className="bg-white shadow-lg border border-slate-200 rounded-3xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold">{name}</CardTitle>
          <CardDescription>By: {teacher}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-2">{description}</p>
          <Link  to={`/classroom/${id}`}>
            <Button className="w-full bg-orange-500 hover:bg-slate-900/90 transition-all duration-300 text-white">
              <BookOpen className="mr-2 h-4 w-4" />
              Enter Classroom
            </Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
};
export default MyCard;
