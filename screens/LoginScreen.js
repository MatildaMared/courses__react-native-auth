import { useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../utils/auth";

function LoginScreen() {
	const [isLoading, setIsLoading] = useState(false);

	async function loginHandler({ email, password }) {
		setIsLoading(true);
		try {
			await login(email, password);
		} catch (error) {
			Alert.alert(
				"Authentication failed",
				"Please check your credentials or try again."
			);
		}
		setIsLoading(false);
	}

	if (isLoading) {
		return <LoadingOverlay message="Logging in..." />;
	}

	return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
