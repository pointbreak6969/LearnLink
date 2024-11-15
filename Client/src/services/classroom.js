import axios from 'axios'
import { baseUrl } from '@/lib/constants'
const classroomService = {
    async createClassroom ({classroomName, universityName, facultyName}) {
        try {
            const response = await axios.post(`${baseUrl}/classroom/createClassroom`, {
                classroomName, universityName, facultyName
            }, {
                withCredentials: true
            })
        } catch (error) {
            
        }
    }
}