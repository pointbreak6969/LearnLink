import React,{useState} from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { BookA, PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
const CreateClassroom = ({createclassDialog,setcreateclassDialog}) => {
    
  return (
     <div>
                <Dialog
                  open={createclassDialog}
                  onOpenChange={setcreateclassDialog}
                >
                  <DialogTrigger />
                  <DialogContent>
                    <DialogTitle>Create a new classroom</DialogTitle>
                    <DialogDescription className="italic">
                      Here you can add details to create new classroom
                    </DialogDescription>
                    <span className="text-gray-700 font-bold">
                      Enter ClassRoom Name:
                    </span>
                    <Input
                      type="text"
                      name="classroomname"
                      id="classroomname"
                      placeholder="Classroom Name"
                      className="mr-2"
                    />
                    <span className="text-gray-700 font-bold">
                      Choose Your University:
                    </span>
                   
                    <Select>
                      <SelectTrigger className="w-full h-8">
                        <SelectValue placeholder="Select your University" />
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

                    <span className="text-gray-700 font-bold">Faculty:</span>
                    <Input
                      type="text"
                      name="faculty"
                      id="faculty"
                      placeholder="Enter Your Faculty (e.g B.E Computer, B.E Civil)"
                      className="mr-2"
                    />
                    <span className="text-gray-700 font-bold">Subject:</span>
                    <Input
                      type="text"
                      name=""
                      id=""
                      placeholder="Enter Subject"
                      className="mr-2"
                    />
                    <Button className=" text-white hover:bg-[#E68600] transition-all duration-300 hover:scale-105">
                      <PlusCircle className="mr-2" /> Add Classroom
                    </Button>
                  </DialogContent>
                </Dialog>
                </div>
  
  );
};

export default CreateClassroom;
