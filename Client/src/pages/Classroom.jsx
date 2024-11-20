import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import CardCollection from "@/components/CardCollection";
import classroomService from "@/services/classroom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const Classroom = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [classrooms, setClassrooms] = useState([]);
  const [suggestedClassrooms, setSuggestedClassrooms] = useState(false);
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
              <div>
                <div className="text-lg font-semibold text-gray-800 mb-2 flex">
                <p className="leading-relaxed text-gray-500 italic">
    Share Resources,Collabrate,Communicate and make learning more organized and engaging. Join now to explore classrooms and enhance your learning experience.
    </p>
                  <div className="text-right mb-4">
                    <Button
                      onClick={() => setDialogOpen(true)}
                      className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 text-white"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Join Classroom
                    </Button>
                  </div>
                </div>
                {/* dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger />
                  <DialogContent className="w-full max-w-md p-6">
                    <DialogTitle>Join a New Class</DialogTitle>
                    <DialogDescription>
                      Enter the class code below to join:
                    </DialogDescription>

                    <form
                      onSubmit={handleJoinClass}
                      className="flex items-center space-x-2 mt-4"
                    >
                      <Input
                        type="text"
                        id="classCode"
                        name="classCode"
                        placeholder="Enter class code"
                        className="flex-grow border-2 border-orange-300 focus:border-orange-500 transition-all duration-200"
                      />
                      <Button
                        type="submit"
                        className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 text-white"
                      >
                        Join Class
                      </Button>
                    </form>

                    {/* Display error message if class code is missing */}
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                  </DialogContent>
                </Dialog>
              </div>
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
