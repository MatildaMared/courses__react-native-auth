import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../utils/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
	const [isLoading, setIsLoading] = useState(false);
	const { authenticate } = useContext(AuthContext);

	async function signupHandler({ email, password }) {
		setIsLoading(true);
		try {
			const token = await createUser(email, password);
			authenticate(token);
		} catch (error) {
			Alert.alert(
				"Signup failed",
				"Could not create user, please check your input and try again."
			);
			setIsLoading(false);
		}
	}

	if (isLoading) return <LoadingOverlay message="Creating user..." />;

	return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
