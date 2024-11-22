import React, { useState } from 'react';
import { Bookmark, GraduationCap, Search, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';

const SearchClassrooms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [university, setUniversity] = useState('');
  const [faculty, setFaculty] = useState('');
  const [subject, setSubject] = useState('');

  const resources = [
    { id: 1, title: 'Calculus I - Limits and Continuity', faculty: 'Engineering', university: 'pu', subject: 'Mathematics' },
    { id: 2, title: 'Organic Chemistry - Alkenes and Alkynes', faculty: 'Medicine', university: 'tu', subject: 'Chemistry' },
    { id: 3, title: 'Microeconomics - Supply and Demand', faculty: 'Business', university: 'pou', subject: 'Economics' },
    { id: 4, title: 'Data Structures - Introduction', faculty: 'Engineering', university: 'University A', subject: 'Computer Science' },
  ];

  const filteredResources = resources.filter(resource => {
    return (
      (!university || resource.university === university) &&
      (!faculty || resource.faculty === faculty) &&
      (!subject || resource.subject === subject)
    );
  });

  const handleSearch = () => {
    alert(`Searching for: ${searchTerm}`);
  };

  const handleView = (title) => {
    alert(`Viewing details for: ${title}`);
  };

  return (
    <>
      <div className="min-h-screen bg-orange-50">

        <main className="container mx-auto p-4">
       

          <div className='mt-10'>
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-[#FF9500]">Filter Classrooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select onValueChange={setUniversity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select University" />
                </SelectTrigger>
                <SelectContent className="max-h-[160px] overflow-y-auto">
                        <SelectItem value="tu">
                          Tribhuvan University (TU)
                        </SelectItem>
                        <SelectItem value="ku">
                          Kathmandu University (KU)
                        </SelectItem>
                        <SelectItem value="pu">
                          Purbanchal University (PU)
                        </SelectItem>
                        <SelectItem value="mu">
                          Manipal University (MU)
                        </SelectItem>
                        <SelectItem value="pou">
                          Pokhara University (PU)
                        </SelectItem>
                        <SelectItem value="lu">
                          Lumbini Buddhist University (LBU)
                        </SelectItem>
                        <SelectItem value="bu">
                          Buddha University (BU)
                        </SelectItem>
                        <SelectItem value="nepal">
                          Nepal Sanskrit University (NSU)
                        </SelectItem>
                        <SelectItem value="cdu">
                          Central Department of Education (CDE) - Tribhuvan
                          University
                        </SelectItem>
                        <SelectItem value="sdu">
                          Shree Harsha University (SHU)
                        </SelectItem>
                        <SelectItem value="ncu">
                          National College of the University (NCU)
                        </SelectItem>
                        <SelectItem value="gcu">
                          Global College of Management (GCM)
                        </SelectItem>
                        <SelectItem value="other">
                          Other..
                        </SelectItem>
                      </SelectContent>
              </Select>
              <Input
                type="text"
                placeholder="Enter Faculty"
                id="faculty"
                name="faculty"
                />
              <Input
                type="text"
                placeholder="Enter Subject"
                id="subject"
                name="subject"
                />
             
              
                   </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredResources.length > 0 ? (
              filteredResources.map(resource => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center text-[#FF9500]">
                        <Bookmark className="mr-2" />
                        {resource.title}
                      </CardTitle>
                      <CardDescription>{`${resource.faculty} - ${resource.university}`}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-between h-full">
                      <span>Subject: {resource.subject}</span>
                      <Button
                        className="mt-4 self-end text-white"
                        variant='default'
                      >
                        Join
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center text-gray-500"
              >
                No resources found for the selected filters.
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
