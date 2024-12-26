import { Button } from '@/components/ui/button'
import classroomService from '@/services/classroom';
import { useForm, Controller } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { universities } from '@/components/CreateClassroom';
const Setting = ({code, name, faculty, university, classroomId}) => {
  const {register, handleSubmit, control} = useForm(); 
  const onSubmit = async (data) =>{
    try {
      const response = await classroomService.updateClasroomDetails(classroomId, data);
      console.log(response);
    } catch (error) {
      throw new Error(error.message); 
    }
  }

  return (
    <div className="space-y-8 mb-10">

      <form onSubmit={handleSubmit(onSubmit)}  className="p-6 border rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-semibold mb-4">Update Class Details</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="university" className="block text-sm font-medium">University</label>
            <Controller
                name="newUniversityName"
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
          </div>
          <div>
            <label htmlFor="faculty" className="block text-sm font-medium">Faculty</label>
            <input
              id="faculty"
              name="faculty"
              type="text"
             {...register("newFacultyName")}
              className="w-full p-2 border rounded-md"
              placeholder="Enter Faculty"
            />
          </div>
          <div>
            <label htmlFor="course" className="block text-sm font-medium">Course</label>
            <input
              id="course"
              name="course"
              type="text"
             {...register("newClassroomName")}
              className="w-full p-2 border rounded-md"
              placeholder="Enter course"
            />
          </div>
        </div>
        <div className="mt-4">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>

      <div className="p-6 border rounded-lg shadow-md bg-white ">
        <h2 className="text-xl font-semibold mb-4">General</h2>
        <div className="space-y-4">
          <div>
            <strong className="text-sm">Course Name:</strong>
            <p>{name}</p>
          </div>
          <div>
            <strong className="text-sm">University:</strong>
            <p>{university}</p>
          </div>
          <div>
            <strong className="text-sm">Faculty</strong>
            <p>{faculty}</p>
          </div>
          <div>
            <strong className="text-sm">Class Code:</strong>
            <p>{code}</p>
          </div>
          <div>
            <strong className="text-sm">Class Link:</strong>
            <p>
              <a href="#" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                random link
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
