import api from "../../services/api";

export async function getProfile() {

    const response = await api.get("/profile");

    return response.data;

}

export async function updateProfile(profileData) {

    const response = await api.put(
        "/profile",
        profileData
    );

    return response.data;

}