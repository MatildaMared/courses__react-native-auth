import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
		AsyncStorage.setItem("token", token);
	};

	const logout = () => {
		setToken(null);
		setIsAuthenticated(false);
		AsyncStorage.removeItem("token");
	};

	const value = { token, isAuthenticated, authenticate, logout };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
