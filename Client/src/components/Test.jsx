import classroomService from "@/services/classroom"
import { useState, useEffect } from "react"
const Test = () => {
    const [classroom, setClassroom] = useState(null)
    useEffect(()=>{
        async function fetchData() {
            try {
                const response = await classroomService.getUserAllClassroom()
                if (response) {
                    setClassroom(response)
                    console.log(response)
                }
            } catch (error) {
                
            }
        }
        fetchData();
    }, [])
  return (
    <div>Test</div>
  )
}
export default Test