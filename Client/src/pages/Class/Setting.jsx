import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const Setting = () => {
  const {register,handleSubmit}=useForm()
  const [classDetails, setClassDetails] = useState({
    university: 'Harvard University',
    faculty: 'Engineering Faculty', 
  });

  const [generalInfo, setGeneralInfo] = useState({
    className: 'Computer Science 101',
    classCode: 'CS101',
    classLink: 'https://classroom.google.com/c/CS101',
  });

  const update=(data)=>{
console.log(data);
  }
 

  return (
    <div className="space-y-8 mb-10">

      <form onSubmit={handleSubmit(update)} className="p-6 border rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-semibold mb-4">Update Class Details</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="university" className="block text-sm font-medium">University</label>
            <input
              id="university"
              name="university"
              type="text"
              {...register("university")}
              className="w-full p-2 border rounded-md"
              placeholder="Enter University"
            />
          </div>
          <div>
            <label htmlFor="faculty" className="block text-sm font-medium">Faculty</label>
            <input
              id="faculty"
              name="faculty"
              type="text"
             {...register("faculty")}
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
             {...register("course")}
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
            <strong className="text-sm">Class Name:</strong>
            <p>{generalInfo.className}</p>
          </div>
          <div>
            <strong className="text-sm">Class Code:</strong>
            <p>{generalInfo.classCode}</p>
          </div>
          <div>
            <strong className="text-sm">Class Link:</strong>
            <p>
              <a href={generalInfo.classLink} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                {generalInfo.classLink}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
