import axios from "axios";

const API_URL = "http://localhost:8000/api/depenses";

export const fetchDepenses = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createDepense = async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
};

export const updateDepense = async (id, data) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
};

export const deleteDepense = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
