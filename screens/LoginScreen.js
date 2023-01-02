import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { login } from "../utils/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function LoginScreen() {
	const [isLoading, setIsLoading] = useState(false);

	async function loginHandler({ email, password }) {
		setIsLoading(true);
		await login(email, password);
		setIsLoading(false);
	}

	if (isLoading) return <LoadingOverlay message="Logging in..." />;

	return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
