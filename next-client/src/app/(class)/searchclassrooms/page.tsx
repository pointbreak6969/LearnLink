import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { universities } from "@/components/CreateClassroom";
import classroomService from "@/services/classroom";
import MyCard from "@/components/MyCard";
import useDebounce from "@/hooks/useDebounce";

const page = () => {
  const [university, setUniversity] = useState("");
  const [faculty, setFaculty] = useState("");
  const [error, setError] = useState("");
  const [classrooms, setClassrooms] = useState([]);

  const debouncedFaculty = useDebounce(faculty, 2000);

  const filteredClassroom = classrooms.filter((classroom) => {
    return (
      (!university || new RegExp(university, "i").test(classroom.university)) &&
      (!debouncedFaculty || new RegExp(faculty, "i").test(classroom.faculty))
    );
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setError("");
        if (university && debouncedFaculty) {
          const response = await classroomService.getClassroomByQuery({
            universityName: university,
            facultyName: debouncedFaculty,
          });
          setClassrooms(response);
        } else if (university) {
          const response = await classroomService.getClassroomByQuery({
            universityName: university,
          });
          setClassrooms(response);
        } else if (debouncedFaculty) {
          const response = await classroomService.getClassroomByQuery({
            facultyName: debouncedFaculty,
          });
          setClassrooms(response);
        } else {
          const response = await classroomService.getSuggestedClassrooms();
          setClassrooms(response.classrooms);
        }
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
  }, [university, debouncedFaculty]);

  return (
    <>
      <div className="min-h-screen bg-orange-50">
        <main className="container mx-auto p-4">
          <div className="mt-10">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
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
                  onChange={(e) => setFaculty(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
              {filteredClassroom.length > 0 ? (
                filteredClassroom.map((classroom) => (
                  <div key={classroom._id}>
                    <MyCard
                      id={classroom?._id}
                      name={classroom?.name}
                      admin={classroom?.admin.fullName}
                      university={classroom?.university}
                      faculty={classroom?.faculty}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 col-span-full">
                  No classrooms found for the selected filters.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default page;
