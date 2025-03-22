import axios from "axios";
import { sliderUrl } from "../../const";

export const handleSliderFetchHelper = async (route) => {
    try {
        const response = route
            ? await axios.get(`${sliderUrl}/${route}`)
            : await axios.get(`${sliderUrl}`);
        return response.data;
    } catch (error) {
        return null
    }
}