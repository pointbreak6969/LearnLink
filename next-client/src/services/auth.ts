import { api } from "@/lib/utils";

export class AuthService{
    async signup({fullName, email, password}: {fullName: string, email: string, password: string}) {
        try {
            const response =  await api.post("/user/register", {fullName, email, password});
            if (response.status === 201) {
                return this.loginUser({email, password}); // Automatically log in after signup
            } else{
                return response.data.data; // Return the response data if not 201
            }
        } catch (error) {
            throw new Error("Failed to create user");
        }
    }
    async loginUser({email, password}: {email: string, password: string}) {
        try {
            const response =  await api.post("/user/login", {email, password});
            return response.data.data; // Return the user data
        } catch (error) {
            throw new Error("Failed to login user");
        }
    }
    async getCurrentUser() {
        try {
            const response = await api.get("/user/me");
            return response.data.data
        } catch (error) {
            throw new Error("Failed to get current user");
        }
    }
    async logoutUser() {
        try {
            return await api.post("/user/logout");
        } catch (error) {
            throw new Error("Failed to logout user");
        }
    }
}

const authService = new AuthService();
export default authService;