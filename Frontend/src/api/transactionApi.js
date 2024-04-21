import apiInstance from "../config/axiosConfig";
import { ADD_TRANSACTION, DELETE_TRANSACTION, EDIT_TRANSACTION, GET_TRANSACTIONS_BY_USER } from "./endpoints";
const transactionApi = {
  getTransactionsByUser: async (userId, filters, page = 0) => {
    if (!userId) {
      console.log("undefined user");
      return;
    }
    const params = new URLSearchParams({ ...filters, page }).toString();
    const endpoint = { ...GET_TRANSACTIONS_BY_USER, url: `${GET_TRANSACTIONS_BY_USER.url}${userId}?${params}` };
    return apiInstance(endpoint);
  },
  addTransaction: async (userId, data) => {
    if (!userId) return;
    const endpoint = { ...ADD_TRANSACTION, url: ADD_TRANSACTION.url + userId, data: data };
    return apiInstance(endpoint);
  },
  editTransaction: async (data) => {
    const endpoint = { ...EDIT_TRANSACTION, data: data };
    return apiInstance(endpoint);
  },
  deleteTransaction: async (id) => {
    const endpoint = { ...DELETE_TRANSACTION, url: `${DELETE_TRANSACTION.url}/${id}` };
    return apiInstance(endpoint);
  },
};

export { transactionApi };
