import { ofetch } from 'ofetch';

const API_URL =
	(import.meta.env.VITE_API_URL as string) || 'http://localhost:3030';

export const client = ofetch.create({
	baseURL: API_URL,
});
