import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../utils/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function SignupScreen() {
	const [isLoading, setIsLoading] = useState(false);

	async function signupHandler({ email, password }) {
		setIsLoading(true);
		await createUser(email, password);
		setIsLoading(false);
	}

	if (isLoading) return <LoadingOverlay message="Creating user..." />;

	return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
