import { Button } from '@/components/ui/button'
import classroomService from '@/services/classroom';
import { Input } from '@/components/ui/input';
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
const Setting = ({ code, name, faculty, university, classroomId }) => {
  const { register, handleSubmit, control } = useForm(); 
  const onSubmit = async (data) => {
    try {
      await classroomService.updateClasroomDetails(classroomId, data);
    } catch (error) {
      console.error("Failed to submit form:", error.message);
      alert("An error occurred while updating classroom details.");
    }
  };

  return (
    <div className="space-y-6 mb-10">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 border border-ink-100 rounded-2xl shadow-card bg-white">
        <h2 className="font-display text-xl font-semibold mb-4 text-ink-900">Update Class Details</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="university" className="block text-sm font-medium text-ink-700 mb-1">University</label>
            <Controller
              name="newUniversityName"
              control={control}
              defaultValue=""
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
            <label htmlFor="newFacultyName" className="block text-sm font-medium text-ink-700 mb-1">Faculty</label>
            <Input
              id="newFacultyName"
              type="text"
              defaultValue=""
              {...register("newFacultyName")}
              placeholder="Enter Faculty"
            />
          </div>
          <div>
            <label htmlFor="newClassroomName" className="block text-sm font-medium text-ink-700 mb-1">Course</label>
            <Input
              id="newClassroomName"
              type="text"
              defaultValue=""
              {...register("newClassroomName")}
              placeholder="Enter course"
            />
          </div>
        </div>
        <div className="mt-5">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>

      <div className="p-6 border border-ink-100 rounded-2xl shadow-card bg-white">
        <h2 className="font-display text-xl font-semibold mb-4 text-ink-900">General</h2>
        <div className="space-y-4">
          <div>
            <strong className="text-sm text-ink-500">Course Name:</strong>
            <p className="text-ink-800">{name}</p>
          </div>
          <div>
            <strong className="text-sm text-ink-500">University:</strong>
            <p className="text-ink-800">{university}</p>
          </div>
          <div>
            <strong className="text-sm text-ink-500">Faculty:</strong>
            <p className="text-ink-800">{faculty}</p>
          </div>
          <div>
            <strong className="text-sm text-ink-500">Class Code:</strong>
            <p className="text-ink-800 font-mono">{code}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
