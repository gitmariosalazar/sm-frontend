import axios from './axios';

export const getCurrentToken = async () => {
    try {
        const response = await axios.get('/verify');
        return response.data;
    } catch (error) {
        console.error('Error fetching current token:', error);
        throw error;
    }
};


//export const registerRequest = async (user) => axios.post(`/auth/register`, user);

export const addToken = async (data) => axios.post(`/addtoken`, data);

export const searchLanguage = async (language, quantity) => axios.get(`/searchrepository/${language}/${quantity}`)

export const searchComponents = async (owner, repo, branch) => axios.get(`/components/${owner}/${repo}/${branch}`)

export const setTokenEnable = async (id) => axios.get(`/settoken/${id}`)

export const deleteToken = async (id) => axios.delete(`/deletetoken/${id}`);

export const revokeAll = async () => axios.put(`/revokeall`)

export const findAllTokens = async () => axios.get('/findall')

export const removeCookieJWT = async () => axios.get('/clear')

export const checkComponents = async (owner, repo, branch) => axios.get(`/components/${owner}/${repo}/${branch}`)
// https://searchrepository.vercel.app/search/average?languages=Go&languages=Python
// http://localhost:4000/search/average/{languages}?languages=Python&languages=Go&languages=Java
export const getDataLanguages = async (languages) => {
    // `languages` debería ser un array de lenguajes
    const queryParams = languages.map(lang => `languages=${encodeURIComponent(lang)}`).join('&');
    const url = `/average/{languages}?${queryParams}`;

    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


// Others

export const loginRequest = async (user) => axios.post(`/auth/login`, user);

export const verifyTokenRequest = async () => axios.get(`/auth/verify`);

export const logout = async () => axios.post('/auth/logout');

export const getTasksRequest = async () => axios.get("/tasks");

export const createTaskRequest = async (task) => axios.post("/tasks", task);

export const updateTaskRequest = async (id, task) =>
    axios.put(`/tasks/${id}`, task);

export const deleteTaskRequest = async (id) => axios.delete(`/tasks/${id}`);

export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`);