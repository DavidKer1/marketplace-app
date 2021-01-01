import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Background from "../../components/Account/Background";
import LoginForm from "../../components/Account/LoginForm";
import RegisterForm from "../../components/Account/RegisterForm";
import Modal from "../../components/Modal";
import Toast from "react-native-toast-message";

export default function UserGuest() {
	const [isVisible, setIsVisible] = useState(false);
	const [loginComponent, setLoginComponent] = useState(false);

	const openModal = (tipo) => {
		setIsVisible(true);
		switch (tipo) {
			case "register":
				setLoginComponent(false);
				break;
			case "login":
				setLoginComponent(true);
				break;
			default:
				break;
		}
	};

	return (
		<>
			<Background />
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>marketplace</Text>
					<Text style={styles.text}>
						La mejor opción para comprar o vender productos de segunda
						mano
					</Text>
				</View>
				
				<View style={styles.sessionData}>
					<Text style={styles.text} onPress={() => openModal("register")}>
						Crear Cuenta
					</Text>
					<Text style={styles.text}>|</Text>
					<Text style={styles.text} onPress={() => openModal("login")}>
						Iniciar Sesión
					</Text>
				</View>
			</SafeAreaView>

			<Modal isVisible={isVisible} setIsVisible={setIsVisible}>
				{loginComponent ? (
					<LoginForm setLoginComponent={setLoginComponent} />
				) : (
					<RegisterForm setLoginComponent={setLoginComponent} />
				)}
			</Modal>
		</>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
	},
	header: {
		justifyContent: "center",
		flex: 1,
	},
	title: {
		color: "#fff",
		textAlign: "center",
		fontSize: 50,
		fontWeight: "bold",
	},
	text: {
		color: "#fff",
		textAlign: "center",
		fontSize: 16,
		paddingHorizontal: 30,
	},

	sessionData: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
		paddingBottom: 20,
		flex: 1,
		alignItems: "flex-end",
	},
});
