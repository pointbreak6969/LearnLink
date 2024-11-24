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


import { PlusCircle, Loader2, BookA, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import CreateClassroom from "./CreateClassroom";

import classroomService from "@/services/classroom";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ClassroomDropDown = () => {
    const navigate=useNavigate()
  const { register, handleSubmit } = useForm()
  const [createclassDialog, setcreateclassDialog] = useState(false);
  const [joinclassDialog, setjoinclassDialog] = useState(false);
  const [error, setError] = useState("");

  const handleJoinClass = async (data) => {
    setError("");
    try {
      const response = await classroomService.joinClassroomByCode(data);
      if (response) {
        toast.success("Class joined successfully");
        navigate(`/classroom/${response.id}`);
      }
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
        <Dialog open={joinclassDialog} onOpenChange={setjoinclassDialog}>
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
      <CreateClassroom
        createclassDialog={createclassDialog}
        setcreateclassDialog={setcreateclassDialog}
      />
    </div>
  );
};

export default ClassroomDropDown;
