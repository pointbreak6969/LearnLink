import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import CardCollection from "@/components/CardCollection";
import classroomService from "@/services/classroom";
import { Loader2 } from "lucide-react";
import ClassroomDropDown from "@/components/ClassroomDropDown";

const Classroom = () => {

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
          setClassrooms(response[0]?.results);
        }
      } catch (error) {
        console.error("Error fetching classrooms:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);


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
              <ClassroomDropDown/>
            </motion.div>

            {classrooms?.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">My Classrooms</h2>
                <CardCollection array={classrooms} isJoined={true} />
              </div>
            )}

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Suggested Classrooms</h2>
              {suggestedClassrooms.length > 0 && (
                <>
                  <CardCollection array={suggestedClassrooms} isJoined={false}/>
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
