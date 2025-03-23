import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { customerUrl } from "../../const";
export const getUserId = () => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem("authToken");
            return;
        }
        return userId;
    } catch (error) {
        return;
    }
};

export const getUserDetails = async (userId) => {
    try {
        const response = await axios.get(`${customerUrl}`, { params: { userId } });
        return response.data;
    } catch (error) {
        return;
    }
};