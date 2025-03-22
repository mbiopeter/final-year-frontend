export const logOut = () => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            return;
        }
        localStorage.removeItem('authToken');
        return;
    } catch (error) {
        return;
    }
}