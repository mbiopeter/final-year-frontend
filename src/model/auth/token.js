import { jwtDecode } from "jwt-decode";
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