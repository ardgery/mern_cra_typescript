export const IS_DEVELOPMENT = window.location.hostname === 'localhost'
const API_URL = !IS_DEVELOPMENT ? '' : 'http://localhost:1337';

export async function apiCall(path: string, payload: { [key: string]: any }) {
    const res = await fetch(`${API_URL}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token') || ''
        },
        body: JSON.stringify(payload)
    }).then(response => response.json());

    return res;
}