import WebSocket from 'ws'

export const JWT_SECRET_TOKEN = 'dsfdkjshfdkjshf3453sdadsaass5dsasad34234@!#%@&343543';

export function processMessage(payload: string) {
    try {
        return JSON.parse(payload)
    } catch (error) {
        return null;
    }
}

export interface CustomWebSocket extends WebSocket {
    [key: string]: any;
    connectionID: string;
}