import React, { useEffect, useState } from "react";
import { Bookmark, GraduationCap, Search, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { universities } from "@/components/CreateClassroom";
import classroomService from "@/services/classroom";
import MyCard from "@/components/MyCard";
import useDebounce from "@/hooks/useDebounce";

const SearchClassrooms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [university, setUniversity] = useState("");
  const [faculty, setFaculty] = useState("");
  const [subject, setSubject] = useState("");
  const [classrooms, setClassrooms] = useState([]);
  const debouncedUniversity=useDebounce(university,300)
  const debouncedFaculty=useDebounce(faculty,300)
  const filteredClassroom = classrooms.filter((classroom) => {
    return (
      (!debouncedUniversity || new RegExp(university, 'i').test(classroom.university)) &&
      (!debouncedFaculty || new RegExp(faculty, 'i').test(classroom.faculty)) &&
      (!subject || new RegExp(subject, 'i').test(classroom.subject))
    );
  });
  

  useEffect(() => {
    async function fetchData() {
      try {
        if (debouncedUniversity) {
          const response = await classroomService.getClassroomByQuery( {universityName:university} );
          console.log(response);
          setClassrooms(response);
        } 
        else if(debouncedFaculty){
          const response =await classroomService.getClassroomByQuery({facultyName:faculty})
          
          setClassrooms(response)
        }
        else if(debouncedUniversity && debouncedFaculty){
          const response=await classroomService.getClassroomByQuery({universityName:university,facultyName:faculty})
             setClassrooms(response);
        }
        else {
          const response = await classroomService.getSuggestedClassrooms();
          setClassrooms(response.classrooms);
        }
      } catch (error) {
        console.error("Error fetching classrooms:", error);
      }
    }
    console.log(classrooms.admin);
    fetchData();
  }, [debouncedUniversity || debouncedFaculty]); 

 

  return (
    <>
      <div className="min-h-screen bg-orange-50">
        <main className="container mx-auto p-4">
          <div className="mt-10">
            <motion.div
              className="bg-white rounded-lg shadow-md p-6 mb-8"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-[#FF9500]">
                Filter Classrooms
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select onValueChange={setUniversity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select University" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[160px] overflow-y-auto">
                    <SelectGroup>
                      {universities.map((university) => (
                        <SelectItem
                          key={university.value}
                          value={university.value}
                        >
                          {university.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input
                  type="text"
                  placeholder="Enter Faculty"
                  id="faculty"
                  name="faculty"
                  onChange={(e)=>setFaculty(e.target.value)}
                />
                {/* <Input
                  type="text"
                  placeholder="Enter Subject"
                  id="subject"
                  name="subject"
                  onChange={(e)=>setSubject(e.target.value)}
                /> */}
              </div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
              {filteredClassroom.length > 0 ? (
                filteredClassroom.map((classroom) => (
                  <motion.div
                    key={classroom._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <MyCard
                      id={classroom?._id}
                      name={classroom?.name}
                      admin={classroom?.admin.fullName}
                      university={classroom?.university}
                      faculty={classroom?.faculty}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center text-gray-500 col-span-full"
                >
                  No classrooms found for the selected filters.
                </motion.div>
              )}
            </div>
            
          </div>
        </main>
      </div>
    </>
  );
};

export default SearchClassrooms;
