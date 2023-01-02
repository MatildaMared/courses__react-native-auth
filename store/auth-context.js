import { createContext, useState } from "react";

export const AuthContext = createContext({
	token: "",
	isAuthenticated: false,
	authenticate: () => {},
	logout: () => {},
});

export default function AuthContextProvider({ children }) {
	const [token, setToken] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const authenticate = (token) => {
		setToken(token);
		setIsAuthenticated(true);
	};

	const logout = () => {
		setToken(null);
		setIsAuthenticated(false);
	};

	const value = { token, isAuthenticated, authenticate, logout };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
