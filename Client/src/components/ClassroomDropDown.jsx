import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PlusCircle, Loader2, BookA, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";

const ClassroomDropDown = () => {
    
  const { register, handleSubmit } = useForm()
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [createclassDialog, setcreateclassDialog] = useState(false);
  const [joinclassDialog, setjoinclassDialog] = useState(false);
  const [error, setError] = useState("");

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
    <div>
        <div>
                <div className="text-right mb-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Plus className="h-10 w-10" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Button
                          onClick={() => setjoinclassDialog(true)}
                          className="w-full"
                        >
                          <BookA />
                          Join classroom
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button
                          onClick={() => setcreateclassDialog(true)}
                          className="w-full"
                        >
                          <PlusCircle className="h-4 w-4" />
                          Create Classroom
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div>
                <Dialog
                  open={joinclassDialog}
                  onOpenChange={setjoinclassDialog}
                >
                  <DialogTrigger />
                  <DialogContent>
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
        
    </div>
  )
}

export default ClassroomDropDown