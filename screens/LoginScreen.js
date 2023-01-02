import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { login } from "../utils/auth";

function LoginScreen() {
	const [loading, isLoading] = useState(false);

	async function loginHandler({ email, password }) {
		isLoading(true);
		await login(email, password);
		isLoading(false);
	}

	return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
