import React, { useState } from 'react';
import { Bookmark, GraduationCap, Search, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';

const SearchNotes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [university, setUniversity] = useState('');
  const [faculty, setFaculty] = useState('');
  const [subject, setSubject] = useState('');

  const resources = [
    { id: 1, title: 'Calculus I - Limits and Continuity', faculty: 'Engineering', university: 'University A', subject: 'Mathematics' },
    { id: 2, title: 'Organic Chemistry - Alkenes and Alkynes', faculty: 'Medicine', university: 'University B', subject: 'Chemistry' },
    { id: 3, title: 'Microeconomics - Supply and Demand', faculty: 'Business', university: 'University C', subject: 'Economics' },
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
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-[#FF9500]">Filter Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select onValueChange={setUniversity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select University" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="University A"><Users className="mr-2" /> University A</SelectItem>
                  <SelectItem value="University B"><Users className="mr-2" /> University B</SelectItem>
                  <SelectItem value="University C"><Users className="mr-2" /> University C</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={setFaculty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Faculty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering"><GraduationCap className="mr-2" /> Engineering</SelectItem>
                  <SelectItem value="Medicine"><GraduationCap className="mr-2" /> Medicine</SelectItem>
                  <SelectItem value="Business"><GraduationCap className="mr-2" /> Business</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={setSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics"><Bookmark className="mr-2" /> Mathematics</SelectItem>
                  <SelectItem value="Chemistry"><Bookmark className="mr-2" /> Chemistry</SelectItem>
                  <SelectItem value="Economics"><Bookmark className="mr-2" /> Economics</SelectItem>
                  <SelectItem value="Computer Science"><Bookmark className="mr-2" /> Computer Science</SelectItem>
                </SelectContent>
              </Select>
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
                        onClick={() => handleView(resource.title)}
                        variant='default'
                      >
                        View
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

          <motion.div
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-[#FF9500] flex items-center">
              <Search className="mr-2" />
              Quick Search
            </h2>
            <div className="flex gap-2">
              <Input
                placeholder="Search for notes, resources, or classes"
                className="flex-grow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                className=" text-white"
                onClick={handleSearch}
                variant='default'
              >
                Search
              </Button>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default SearchNotes;
