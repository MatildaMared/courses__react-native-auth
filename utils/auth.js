import axios from "axios";
import { API_KEY } from "@env";

export async function login(email, password) {
	const response = await axios.post(
		`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
		{
			email,
			password,
			returnSecureToken: true,
		}
	);

	console.log(response.data);
}

export async function createUser(email, password) {
	const response = await axios.post(
		`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
		{
			email,
			password,
			returnSecureToken: true,
		}
	);
}
