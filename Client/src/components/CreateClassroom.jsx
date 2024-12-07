import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import classroomService from "@/services/classroom";
import { useNavigate } from "react-router-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

export const universities = [
  { value: "Tribhuvan University", label: "Tribhuvan University (TU)" },
  { value: "Kathmandu University", label: "Kathmandu University (KU)" },
  { value: "Purbanchal University", label: "Purbanchal University (PU)" },
  { value: "Manipal University", label: "Manipal University (MU)" },
  { value: "Pokhara University", label: "Pokhara University (PU)" },
  {
    value: "Lumbini Buddhist University",
    label: "Lumbini Buddhist University (LBU)",
  },
  { value: "Buddha University", label: "Buddha University (BU)" },
  {
    value: "Nepal Sanskrit University",
    label: "Nepal Sanskrit University (NSU)",
  },
  {
    value: "Central Department of Education - Tribhuvan University",
    label: "Central Department of Education (CDE) - Tribhuvan University",
  },
  { value: "Shree Harsha University", label: "Shree Harsha University (SHU)" },
  {
    value: "National College of the University",
    label: "National College of the University (NCU)",
  },
  {
    value: "Global College of Management",
    label: "Global College of Management (GCM)",
  },
  { value: "Other", label: "Other.." },
];

const CreateClassroom = ({ createclassDialog, setcreateclassDialog }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, control, formState: {errors} } = useForm();
  const createClassroom = useMutation({
    mutationFn: classroomService.createClassroom,
    onSuccess: (response) => {
      toast.success("Classroom created successfully");
      navigate(`/classroom/${response._id}`);
    },
  });
  const handleCreateClassroom = async (data) => {
    createClassroom.mutate(data);
  };

  return (
    <div>
      <Dialog open={createclassDialog} onOpenChange={setcreateclassDialog}>
        <DialogTrigger />
        <DialogContent>
          <DialogTitle>Create a new classroom</DialogTitle>
          <DialogDescription className="italic">
            Here you can add details to create a new classroom
          </DialogDescription>
          <form onSubmit={handleSubmit(handleCreateClassroom)} className="space-y-4">
            {/* Classroom Name */}
            <div className="flex flex-col space-y-2">
              <Label
                htmlFor="classroomname"
                className="font-bold text-gray-700"
              >
                Classroom Name:
              </Label>
              <Input
                type="text"
                name="classroomname"
                id="classroomname"
                placeholder="Enter classroom name"
                className="mr-2"
                {...register("classroomName", { required: true })}
              />
              {errors.classroomName && (<p className="text-red-500">Please Enter Valid Classroom Name</p>)}
            </div>

            {/* University Selection */}
            <div className="flex flex-col space-y-2">
              <Label className="font-bold text-gray-700">
                Choose Your University:
              </Label>
              <Controller
                name="universityName"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full h-8">
                      <SelectValue placeholder="Select your University" />
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
                )}
              />
              {errors.universityName && (<p className="text-red-500">Please Select University</p>)}
            </div>

            {/* Faculty Input */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="faculty" className="font-bold text-gray-700">
                Faculty:
              </Label>
              <Input
                type="text"
                name="faculty"
                id="faculty"
                placeholder="Enter your Faculty (e.g. B.E Computer, B.E Civil)"
                className="mr-2"
                {...register("facultyName", { required: true })}
              />
              {errors.facultyName && (<p className="text-red-500">Please Enter Valid Faculty Name</p>)}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-4">
              <Button
                className="text-white hover:bg-[#E68600] transition-all duration-300 hover:scale-105"
                type="submit"
              >
                <PlusCircle className="mr-2" /> Add Classroom
              </Button>
            </div>
          
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateClassroom;
