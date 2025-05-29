import axios from "axios";
import { API_URL } from "@/services/credentials";

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("jwt");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/**
 * Надсилає форму з JSON-даними та файлами
 * @param {Object} data - SubmissionRequest payload
 * @param {File[]} files - Масив файлів для submitterDocuments
 */
export async function createSubmission(data, files) {
    const formData = new FormData();

    formData.append(
        'data',
        new Blob([JSON.stringify(data)], { type: 'application/json' })
    );

    files.forEach((file) => {
        formData.append('submitterDocuments', file); // важливо: ім'я збігається з @RequestPart
    });

    try {
        const response = await api.post('/submissions/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
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

/**
 * Отримує всі submissions певного користувача (submitter)
 * @param {number} submitterId - ID користувача, для якого потрібно отримати submissions
 * @returns {Promise<{ body: any, status: number }>}
 */
export async function getSubmissionsBySubmitter(submitterId) {
    try {
        const response = await api.get('/submissions/get/allBySubmitter', {
            params: {
                submitter_id: submitterId,
            },
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

export async function getActiveSubmissionsCountByOwner(submitterId) {
    try {
        const response = await api.get('/submissions/get/activeCount', {
            params: {
                submitter_id: submitterId,
            },
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

