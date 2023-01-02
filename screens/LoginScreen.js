import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { login } from "../utils/auth";

function LoginScreen() {
	const [isLoading, setIsLoading] = useState(false);
	const { authenticate } = useContext(AuthContext);

	async function loginHandler({ email, password }) {
		setIsLoading(true);
		try {
			const token = await login(email, password);
			authenticate(token);
		} catch (error) {
			Alert.alert(
				"Authentication failed",
				"Please check your credentials or try again."
			);
      setIsLoading(false);
		}
	}

	if (isLoading) {
		return <LoadingOverlay message="Logging in..." />;
	}

	return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
