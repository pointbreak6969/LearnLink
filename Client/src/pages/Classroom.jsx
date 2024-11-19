import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import CardCollection from "@/components/CardCollection";
import classroomService from "@/services/classroom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const Classroom = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [classrooms, setClassrooms] = useState([]);
  const [suggestedClassrooms, setSuggestedClassrooms] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await classroomService.getUserAllClassroom();
        if (response) {
          setClassrooms(response[0].results);
        }
      } catch (error) {
        false;
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleJoinClass = async (data) => {
    setError("");
    try {
      const response = await classroomService.joinClassroomByCode(data);
      navigate(`/classroom/${response.id}`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-orange-100 to-green-100 mt-0">
          <main className="container mx-auto mt-0 py-10 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="mb-8 bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">
                    Join a New Class
                  </CardTitle>
                  <CardDescription>Enter the class code</CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={handleSubmit(handleJoinClass)}
                    className="flex items-center space-x-2"
                  >
                    <Input
                      type="text"
                      id="email"
                      placeholder="Enter class code"
                      {...register("code", {
                        required: true,
                      })}
                      className="flex-grow border-2 border-orange-300 focus:border-orange-500 transition-all duration-200"
                    />
                    <Button
                      type="submit"
                      className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 text-white"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Join Class
                    </Button>
                  </form>
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                </CardContent>
              </Card>
            </motion.div>
            {classrooms.length > 0 ? (
              <div>
                {" "}
                <h2 className="text-2xl font-bold mb-4">My Classrooms</h2>
                <CardCollection array={classrooms} />
              </div>
            ) : null}

            <h2 className="text-2xl font-bold mb-4 mt-8">
              Suggested Classrooms
            </h2>
            <CardCollection array={classrooms} />
          </main>
        </div>
      )}
    </>
  );
};

export default Classroom;
