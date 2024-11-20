import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, Loader2 } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedClassrooms, setSuggestedClassrooms] = useState([]);
  const [suggestedClassroomsPage, setSuggestedClassroomsPage] = useState(1);
  const [hasMoreSuggestedClassrooms, setHasMoreSuggestedClassrooms] =
    useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await classroomService.getUserAllClassroom();
        if (response) {
          setClassrooms(response[0].results);
        }
      } catch (error) {
        console.error("Error fetching user classrooms:", error);
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

  const fetchSuggestedClassrooms = async (page = 1) => {
    try {
      setIsLoadingMore(true);
      const response = await classroomService.getSuggestedClassrooms();
      if (response) {
        if (page === 1) {
          setSuggestedClassrooms(response.classrooms);
        } else {
          setSuggestedClassrooms((prev) => [...prev, ...response.classrooms]);
        }
        setHasMoreSuggestedClassrooms(response.hasMore);
        setSuggestedClassroomsPage(response.currentPage);
      }
    } catch (error) {
      console.error("Error fetching suggested classrooms:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchSuggestedClassrooms(1);
  }, []);

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMoreSuggestedClassrooms) {
      fetchSuggestedClassrooms(suggestedClassroomsPage + 1);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-orange-100 to-green-100 mt-0">
          <main className="container mx-auto mt-0 py-10 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <div className="text-right mb-4">
                  <Button
                    onClick={() => setDialogOpen(true)}
                    className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 text-white"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Join Classroom
                  </Button>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger />
                  <DialogContent className="w-full max-w-md p-6">
                    <DialogTitle>Join a New Class</DialogTitle>
                    <DialogDescription>
                      Enter the class code below to join:
                    </DialogDescription>

                    <form
                      onSubmit={handleSubmit(handleJoinClass)}
                      className="flex items-center space-x-2 mt-4"
                    >
                      <Input
                        type="text"
                        id="classCode"
                        name="classCode"
                        placeholder="Enter class code"
                        className="flex-grow border-2 border-gray-300 focus:border-gray-500 transition-all duration-200"
                        {...register("code", { required: true })}
                      />
                      <Button
                        type="submit"
                        className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 text-white"
                      >
                        Join Class
                      </Button>
                    </form>

                    {error && <p className="text-red-500 mt-2">{error}</p>}
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>

            {classrooms.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">My Classrooms</h2>
                <CardCollection array={classrooms} />
              </div>
            )}

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Suggested Classrooms</h2>
              {suggestedClassrooms.length > 0 && (
                <>
                  <CardCollection array={suggestedClassrooms} />
                  {hasMoreSuggestedClassrooms && (
                    <div className="flex justify-center mt-6">
                      <Button
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 text-white"
                      >
                        {isLoadingMore ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          "Load More"
                        )}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default Classroom;
