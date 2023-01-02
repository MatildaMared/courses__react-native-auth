import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
	const [message, setMessage] = useState("");
	const { token } = useContext(AuthContext);
	useEffect(() => {
		async function fetchMessage() {
			try {
				const response = await axios.get(
					`https://react-native-course-dc5ca-default-rtdb.europe-west1.firebasedatabase.app/secret.json?auth=${token}`
				);
				setMessage(response.data);
			} catch (error) {
				console.log("Error: ", error);
			}
		}

		fetchMessage();
	}, []);

	return (
		<View style={styles.rootContainer}>
			<Text style={styles.title}>Welcome!</Text>
			<Text>You authenticated successfully!</Text>
			<Text>{message}</Text>
		</View>
	);
}

export default WelcomeScreen;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 32,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 8,
	},
});
