import axios from "axios";
import img from '../../assets/images/product1.png';
import { cartUrl } from "../../const";

export const handleFetchCart = async (param) => {
    try {
        const cartItems = await axios.get(`${cartUrl}/all`, { params: { userId: param } });
        return cartItems.data;
    } catch (error) {
        return error;
    }
}


export const isOrderPlaced = (products, id) => {
    const parsedId = parseInt(id, 10);
    return products.length > 0 && products.some(product => product.productId === parsedId);
};