import apiInstance from "../config/axiosConfig";
import { ADD_CATEGORY, GET_CATEGORIES_BY_USER } from "./endpoints";
const categoryApi = {
  getCategoriesByUser: async (userId) => {
    if (!userId) return;
    const endpoint = { ...GET_CATEGORIES_BY_USER, url: GET_CATEGORIES_BY_USER.url + userId };
    return apiInstance(endpoint);
  },
  addCategory: async (userId, data) => {
    if (!userId) return;
    const endpoint = { ...ADD_CATEGORY, url: ADD_CATEGORY.url + userId, data: data };
    return apiInstance(endpoint);
  },
};

export { categoryApi };
