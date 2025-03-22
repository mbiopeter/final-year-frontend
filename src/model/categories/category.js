import axios from "axios";
import { categoryUrl } from "../../const";


export const fetchCategories = async (route) => {
    try {
        const response = await axios.get(`${categoryUrl}/${route}`);
        return response.data;
    } catch {
        console.log(error)
    }
}

export const getCategoryById = (categories, id) => {
    const parsedId = parseInt(id, 10);
    return categories.find(category => category.id === parsedId) || null;
};