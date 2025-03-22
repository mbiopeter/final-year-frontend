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

export const cancelations = [
    { id: 1, img: img, product: "My Product1", price: 160, quantity: 1, date: '2025-03-01' },
    { id: 3, img: img, product: "My Product3", price: 164, quantity: 1, date: '2025-03-02' },
    { id: 2, img: img, product: "My Product2", price: 180, quantity: 1, date: '2025-03-03' },
    { id: 4, img: img, product: "My Product4", price: 156, quantity: 1, date: '2025-03-04' }
];

export const isOrderPlaced = (products, id) => {
    const parsedId = parseInt(id, 10);
    return products.length > 0 && products.some(product => product.productId === parsedId);
};