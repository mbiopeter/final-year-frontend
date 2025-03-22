import { productsUrl } from '../../const';
import axios from "axios";

export const fetchProductsHelper = async (route, param) => {
	try {
		const response = param
			? await axios.get(`${productsUrl}/${route}`, { params: { id: param } })
			: await axios.get(`${productsUrl}/${route}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching products:", error);
		return null;
	}
};

export const getProductById = (products, id) => {
	const parsedId = parseInt(id, 10);
	return products.find(product => product.id === parsedId) || null;
};

export const getProductByCategory = (products, category) => {
	return products.filter(product => product.category?.toLowerCase() === category.toLowerCase()) || [];
};

export const getProductBySubCategory = (products, subCategory) => {
	return products.filter(product => product.subcategory?.toLowerCase() === subCategory.toLowerCase()) || [];
};

export const isProductLiked = (products, id) => {
	const parsedId = parseInt(id, 10);
	return products.length > 0 && products.some(product => product.id === parsedId);
};

export const isHistory = (history, id) => {
	const parsedId = parseInt(id, 10);
	return history.some(product => product.id === parsedId);
};