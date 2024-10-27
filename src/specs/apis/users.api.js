import axiosInstance from "../../libs/axiosInstance.js";

export function get_single_user(id) {
    return axiosInstance.get(`/users/${id}`);
}

export function create_user(userData) {
    return axiosInstance.post('/users', userData);
}

export function update_user(id, userData) {
    return axiosInstance.put(`/users/${id}`, userData);
}

export function delete_user(id) {
    return axiosInstance.delete(`/users/${id}`);
}
