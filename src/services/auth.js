import axios from "axios";
import {API_URL} from "@/services/credentials";

const api = axios.create({
    baseURL: API_URL,
});

// Додаємо токен до кожного запиту автоматично
api.interceptors.request.use(config => {
    const token = localStorage.getItem("jwt");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Вхід: виконуємо запит і зберігаємо токен
export async function login(username, password) {
    const response = await api.post('/identity/signin', {
        username,
        password,
    });

    const token = response.data.jwt;
    if (token) {
        localStorage.setItem("jwt", token);
    }
    const userId = response.data.id;
    if (userId) {
        localStorage.setItem("userId", userId);
    }
    return response;
}

export async function register(email, password) {
    try {
        const response = await api.post('/identity/signup/student', {
            email,
            password,
        });

        return {
            body: response.data,
            status: response.status,
        };
    } catch (error) {
        return {
            body: error.response?.data || { message: 'Unknown error' },
            status: error.response?.status || 500,
        };
    }
}

export async function getUserData() {
    const userId = localStorage.getItem("userId");

    try {
        if (userId) {
            // Якщо є userId — отримуємо користувача напряму
            const response = await api.get(`/users/get?id=${userId}`);
            return response.data;
        } else {
            // Якщо нема userId — звертаємось до /whoami
            const whoAmIResponse = await api.get('/identity/whoami?json=true');

            const { username } = whoAmIResponse.data;

            // Отримуємо користувача за username (email)
            const userResponse = await api.get(`/users/get?username=${username}`);
            return userResponse.data;
        }
    } catch (error) {
        throwUserDataError(error);
    }
}

function throwUserDataError(error) {
    if (!error.response) {
        console.error("Network error or the server is not responding.");
        throw new Error("Failed connection with server.");
    }

    const { status, data } = error.response;

    switch (status) {
        case 401:
            console.warn("User is not authorized. Doing logout...");
            logout(); // Очистити токен, перенаправити на /hostels
            throw new Error("Session expired. Authorize again.");
        case 404:
            console.warn("User does not exist.");
            throw new Error(data.message || "User does not exist.");
        case 500:
            console.error("Internal server error.");
            throw new Error("Internal server error.");
        default:
            console.error(`Unexpected error [${status}]:`, data);
            throw new Error(data.message || "Unexpected error.");
    }
}

export async function updateUserContacts(email, phone, birthDate) {
    const userId = localStorage.getItem("userId");

    try {
        if (userId) {
            // Якщо є userId — отримуємо користувача напряму
            const response = await api.put(`/users/update-contacts?id=${userId}`, {
                email,
                phone,
                birthDate,
            });
            return response;
        } else {
            logout();
        }
    } catch (error) {
        throwUserDataError(error);
    }
}

export function logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    window.location.href = "/hostels";
}
