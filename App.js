import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import { useContext } from "react";
import { AuthContext } from "./store/auth-context";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import AuthContextProvider from "./store/auth-context";
import IconButton from "./components/ui/IconButton";

const Stack = createNativeStackNavigator();

function AuthStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primary500 },
				headerTintColor: "white",
				contentStyle: { backgroundColor: Colors.primary100 },
			}}
		>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Signup" component={SignupScreen} />
		</Stack.Navigator>
	);
}

function AuthenticatedStack() {
	const { logout } = useContext(AuthContext);

	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primary500 },
				headerTintColor: "white",
				contentStyle: { backgroundColor: Colors.primary100 },
				headerRight: ({ tintColor }) => (
					<IconButton
						icon="exit"
						color={tintColor}
						size={24}
						onPress={logout}
					/>
				),
			}}
		>
			<Stack.Screen name="Welcome" component={WelcomeScreen} />
		</Stack.Navigator>
	);
}

function Navigation() {
	const { isAuthenticated } = useContext(AuthContext);

	return (
		<NavigationContainer>
			{isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
		</NavigationContainer>
	);
}

function Root() {
	const { authenticate } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchToken() {
			const storedToken = await AsyncStorage.getItem("token");
			if (storedToken) {
				authenticate(storedToken);
			}
			setIsLoading(false);
		}

		fetchToken();
	}, []);

	if (isLoading) return <AppLoading />;

	return <Navigation />;
}

export default function App() {
	return (
		<>
			<StatusBar style="light" />
			<AuthContextProvider>
				<Root />
			</AuthContextProvider>
		</>
	);
}
