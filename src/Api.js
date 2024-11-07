import axios from "axios";
import { MdMacroOff } from "react-icons/md";

const API_URL = "http://localhost:5000";


//User
export const Login = async (userName, Password) => {
    try {
        return await axios.get(`${API_URL}/api/auth/login/${userName}/${Password}`);
    } catch (error) {
        console.error("Error at Login:", error);
        throw error;
    }
}

export const createNewAccount = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/signup`, userData);
        return response.data; // Returns { message: 'User signed up successfully!', user: { Name, UserName, Email, Gender } }
    } catch (error) {
        console.error("Signup API error:", error);
        throw error.response?.data?.error || "Signup failed";
    }
};


//Events
export const GetEvents = async()=>{
    try{
        const response = await axios.get(`${API_URL}/api/event/getAll`);
        return response.data;
    }
    catch(error){
        console.error("Error at Get Events:", error);
        throw error;
    }
}

export const UpdateEvents = async(eventId,eventData)=>{
    try{
        const response = await axios.put(`${API_URL}/api/event/update/${eventId}`,eventData);
        return response.data;
    }
    catch(error){
        console.error("Error at Update Events:", error);
        throw error;
    }
}

export const DeleteEvent = async(eventId)=>{
    try{
        const response = await axios.delete(`${API_URL}/api/event/delete/${eventId}`);
        return response.data;
    }
    catch(error)
    {
        console.error("Error at Delete Events:", error);
        throw error;
    }
}

export const CreateEvent = async(newEvent,userId)=>{
    try{
        const response = await axios.post(`${API_URL}/api/event/create/${userId}`,newEvent);
        return response.data;
    }
    catch(error){
        console.error("Error at Create Events:", error);
        throw error;
    }
} 


