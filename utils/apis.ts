export const BASE_URL = "https://mavehiringserver.azurewebsites.net";

// Authentication
export const LOGIN = `${BASE_URL}/api/auth/login`;
export const REFRESH_TOKEN = `${BASE_URL}/api/auth/refresh`;

// Task Room Management
export const CREATE_TASK_ROOM = `${BASE_URL}/api/tasks/new`;
export const GET_TASKS = (roomId: string) => `${BASE_URL}/api/tasks/${roomId}`;
export const GET_NEXT_TASK = (roomId: string) => `${BASE_URL}/api/tasks/new/${roomId}`;
