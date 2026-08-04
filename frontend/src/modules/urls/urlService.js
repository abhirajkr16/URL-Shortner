import api from "../../services/api";

export async function createShortUrl(data) {

    const response =
        await api.post("/urls", data);

    return response.data;

}

export async function getUserUrls() {

    const response =
        await api.get("/urls");

    return response.data;

}

export async function deleteUrl(id) {

    const response =
        await api.delete(`/urls/${id}`);

    return response.data;

}

export async function updateUrl(id, data) {

    const response =
        await api.put(`/urls/${id}`, data);

    return response.data;

}