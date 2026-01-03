import axios from 'axios';
import type { User } from '../schema/user.interface';
const API_URL = import.meta.env.VITE_API_URL;

// export const getUsers = async () => {
//   const { data } = await axios.get(API_URL);
//   return data.users;
// };

export const getUsers = async (limit: number = 10, skip: number = 0) => {
  const { data } = await axios.get(`${API_URL}?limit=${limit}&skip=${skip}`);
  return data; 
};

export const addUser = async (userData: User) => {
  return axios.post(`${API_URL}/add`, userData);
};

export const updateUser = async (payload: { id: number; data: User }) => {
  return axios.put(`${API_URL}/${payload.id}`, payload.data);
};

export const deleteUser = async (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
};