import React, { useState } from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from './ui/button';
import { Check, Eye, FileText, Plus, Trash2, User, X } from 'lucide-react';
import { Input } from './ui/input';

const ClassroomHandle = () => {
    const [classrooms, setClassrooms] = useState([
        { id: 1, name: "Math 101", code: "MATH101", faculty: "Mathematics", subject: "Algebra", requests: ["John Doe", "Jane Smith"], resources: [{ id: 1, title: "Math Resource", approved: false }] },
        { id: 2, name: "History 202", code: "HIST202", faculty: "History", subject: "World History", requests: ["Alice Johnson"], resources: [] }
    ]);

    const [newClassroom, setNewClassroom] = useState({
        name: '',
        code: '',
        faculty: '',
        subject: ''
    });

    const addClassroom = () => {
      
    };

    return (
        <div>
            <TabsContent value="classrooms">
                <Card className="animate-fade-in-up">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-[#FF9500]">My Classrooms</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center mb-4">
                            <Input
                                type="text"
                                placeholder="Classroom Name"
                                className="mr-2"
                               
                            />
                            <Input
                                type="text"
                                placeholder="University"
                                className="mr-2"
                            />
                            <Input
                                type="text"
                                placeholder="Faculty"
                                className="mr-2"
                               
                            />
                            <Input
                                type="text"
                                placeholder="Subject"
                                className="mr-2"
                                
                            />
                            <Button onClick={addClassroom} className="bg-[#926322] text-white hover:bg-[#E68600] transition-all duration-300 hover:scale-105">
                                <Plus className="mr-2" /> Add Classroom
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {classrooms.map((classroom) => (
                                <Card key={classroom.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                                    <CardHeader className="bg-gradient-to-r from-green-400 to-[#FF9500]">
                                        <CardTitle className="text-xl">{classroom.name}</CardTitle>
                                        <div className="flex items-center mt-2">
                                            <Badge variant="secondary" className="mr-2">Code: {classroom.code}</Badge>
                                            <Badge variant="secondary" className="mr-2">Faculty: {classroom.faculty}</Badge>
                                            <Badge variant="secondary">Subject: {classroom.subject}</Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-sm text-gray-600 flex items-center">
                                                <User className="w-4 h-4 mr-1" /> {classroom.requests.length} pending join requests
                                            </span>
                                            <span className="text-sm text-gray-600 flex items-center">
                                                <FileText className="w-4 h-4 mr-1" /> {classroom.resources.length} resources
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" className="mr-2 transition-all duration-300 hover:bg-[#FF9500] hover:text-white">
                                                        <Eye className="mr-2" /> View Details
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-2xl font-bold text-[#FF9500]">{classroom.name}</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="mt-4">
                                                        <h4 className="font-semibold mb-2 flex items-center">
                                                            <User className="w-4 h-4 mr-1" /> Join Requests
                                                        </h4>
                                                        {classroom.requests.length > 0 ? (
                                                            classroom.requests.map((student, index) => (
                                                                <div key={index} className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded">
                                                                    <span>{student}</span>
                                                                    <div>
                                                                        <Button onClick={() => approveRequest(classroom.id, student)} 
                                                                            className="bg-green-500 text-white hover:bg-green-600 mr-2 transition-colors duration-300">
                                                                            <Check size={16} className="mr-1" /> Approve
                                                                        </Button>
                                                                        <Button variant="outline" className="text-red-500 hover:text-red-600 transition-colors duration-300">
                                                                            <X size={16} className="mr-1" /> Reject
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p>No pending join requests.</p>
                                                        )}
                                                    </div>
                                                    <div className="mt-4">
                                                        <h4 className="font-semibold mb-2 flex items-center">
                                                            <FileText className="w-4 h-4 mr-1" /> Resources
                                                        </h4>
                                                        {classroom.resources.length > 0 ? (
                                                            classroom.resources.map((resource, index) => (
                                                                <div key={index} className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded">
                                                                    <span>{resource.title}</span>
                                                                    {!resource.approved && (
                                                                        <div>
                                                                            <Button onClick={() => approveRequest(classroom.id, resource.id)} 
                                                                                className="bg-green-500 text-white hover:bg-green-600 mr-2 transition-colors duration-300">
                                                                                <Check size={16} className="mr-1" /> Approve
                                                                            </Button>
                                                                            <Button variant="outline" className="text-red-500 hover:text-red-600 transition-colors duration-300">
                                                                                <X size={16} className="mr-1" /> Reject
                                                                            </Button>
                                                                        </div>
                                                                    )}
                                                                    {resource.approved && (
                                                                        <Badge variant="success">Approved</Badge>
                                                                    )}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p>No resources in this classroom.</p>
                                                        )}
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                            <Button variant="outline" onClick={() => deleteClassroom(classroom.id)} 
                                                className="text-red-500 hover:text-red-600 transition-colors duration-300">
                                                <Trash2 className="mr-2" /> Delete
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </div>
    );
};

export default ClassroomHandle;
