import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../utils/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";

function SignupScreen() {
	const [isLoading, setIsLoading] = useState(false);

	async function signupHandler({ email, password }) {
		setIsLoading(true);
		try {
			await createUser(email, password);
		} catch (error) {
			Alert.alert(
				"Signup failed",
				"Could not create user, please check your input and try again."
			);
		}
		setIsLoading(false);
	}

	if (isLoading) return <LoadingOverlay message="Creating user..." />;

	return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
