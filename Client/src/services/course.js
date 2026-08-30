import axios from "axios";
import { baseUrl } from "@/lib/constants";

class CourseService {
  // Local storage helper key
  getStorageKey(userId) {
    return `learnlink_courses_${userId || "guest"}`;
  }

  getLocalEnrollments(userId) {
    try {
      const data = localStorage.getItem(this.getStorageKey(userId));
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  saveLocalEnrollment(userId, enrollment) {
    try {
      const list = this.getLocalEnrollments(userId);
      const existingIdx = list.findIndex((e) => e.courseId === enrollment.courseId);
      if (existingIdx >= 0) {
        list[existingIdx] = { ...list[existingIdx], ...enrollment };
      } else {
        list.unshift(enrollment);
      }
      localStorage.setItem(this.getStorageKey(userId), JSON.stringify(list));
    } catch (e) {
      console.warn("Failed to save enrollment locally", e);
    }
  }

  async getMyEnrolledCourses(userId) {
    try {
      const response = await axios.get(`${baseUrl}/course/my-courses`, {
        withCredentials: true,
      });
      const serverEnrollments = response.data?.data || [];
      
      // Merge with any locally stored enrollments
      if (userId) {
        const localList = this.getLocalEnrollments(userId);
        const map = new Map();
        serverEnrollments.forEach((e) => map.set(e.courseId, e));
        localList.forEach((e) => {
          if (!map.has(e.courseId)) {
            map.set(e.courseId, e);
          }
        });
        return Array.from(map.values());
      }
      return serverEnrollments;
    } catch (error) {
      console.warn("Server unavailable, reading from local storage:", error.message);
      if (userId) {
        return this.getLocalEnrollments(userId);
      }
      return [];
    }
  }

  async checkEnrollment(courseId, userId) {
    if (!courseId) return false;
    
    // Check local storage first
    if (userId) {
      const localList = this.getLocalEnrollments(userId);
      const found = localList.find((e) => e.courseId === courseId && e.status === "active");
      if (found) return true;
    }

    try {
      const response = await axios.get(`${baseUrl}/course/status/${courseId}`, {
        withCredentials: true,
      });
      return response.data?.data?.isEnrolled || false;
    } catch {
      return false;
    }
  }

  async purchaseCourse({ courseId, courseTitle, pricePaid = 0, currency = "USD", paymentMethod = "Card", userId }) {
    const payload = {
      courseId,
      courseTitle,
      pricePaid,
      currency,
      paymentMethod,
    };

    const localRecord = {
      ...payload,
      _id: `enroll_${Date.now()}`,
      transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      progress: 0,
      completedLectures: [],
      status: "active",
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await axios.post(`${baseUrl}/course/purchase`, payload, {
        withCredentials: true,
      });
      const data = response.data?.data || localRecord;
      if (userId) {
        this.saveLocalEnrollment(userId, data);
      }
      return data;
    } catch (error) {
      console.warn("Server error during purchase, saving offline enrollment:", error.message);
      if (userId) {
        this.saveLocalEnrollment(userId, localRecord);
        return localRecord;
      }
      const errorMessage = error.response?.data?.message || "Failed to purchase course";
      throw new Error(errorMessage);
    }
  }

  async updateProgress(courseId, { lectureId, totalLectures = 1, isCompleted = true, userId }) {
    if (userId) {
      const localList = this.getLocalEnrollments(userId);
      const enrollment = localList.find((e) => e.courseId === courseId);
      if (enrollment) {
        const completed = new Set(enrollment.completedLectures || []);
        if (isCompleted) completed.add(lectureId);
        else completed.delete(lectureId);
        
        enrollment.completedLectures = Array.from(completed);
        enrollment.progress = Math.min(100, Math.round((enrollment.completedLectures.length / Math.max(totalLectures, 1)) * 100));
        this.saveLocalEnrollment(userId, enrollment);
      }
    }

    try {
      const response = await axios.patch(
        `${baseUrl}/course/progress/${courseId}`,
        { lectureId, totalLectures, isCompleted },
        { withCredentials: true }
      );
      return response.data?.data;
    } catch {
      return null;
    }
  }
}

const courseService = new CourseService();
export default courseService;
