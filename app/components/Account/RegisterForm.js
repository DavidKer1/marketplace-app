import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Input, Button, Icon } from "react-native-elements";
import Toast from "react-native-toast-message";

import { useFormik } from "formik";
import * as yup from "yup";

import {
	ALTERNATIVE_COLOR,
	ERROR_COLOR,
	PRIMARY_COLOR,
} from "../../utils/constants";
import FormContainer from "../FormContainer";
import HeaderTitle from "../HeaderTitle";
import { FirebaseContext } from "../../context/firebase/FirebaseContext";

export default function RegisterForm({ setLoginComponent }) {
	const [hiddenPass, setHiddenPass] = useState(true);
	const [loading, setLoading] = useState(false);
	const [emailError, setEmailError] = useState("");
	const { firebase, setReloadUser, db } = useContext(FirebaseContext);
	const formik = useFormik({
		initialValues: {
			nombre: "",
			email: "",
			password: "",
		},
		validationSchema: yup.object().shape({
			nombre: yup
				.string()
				.required("El nombre es requerido")
				.min(2, "El nombre debe tener minimo dos letras")
				.max(50, "El nombre es demasiado grande"),
			email: yup
				.string()
				.required("El email es requerido")
				.email("El email no es válido"),
			password: yup
				.string()
				.required("La contraseña es requerida")
				.min(5, "La contraseña debe tener minimo 5 caracteres"),
		}),
		onSubmit: async (data) => {
			setLoading(true);
			try {
				const newUser = await firebase
					.auth()
					.createUserWithEmailAndPassword(data.email, data.password);
				await newUser.user.updateProfile({
					displayName: data.nombre,
				});
				await db.collection("users")
					.doc(newUser.user.uid)
					.set({
						phoneNumber: '',
						direccion: '',
					})
				
				setReloadUser(true);

				Toast.show({
					type: "success",
					position: "top",
					text1: "Usuario registrado correctamente",
					visibilityTime: 2500,
					autoHide: true,
				});
			} catch (error) {
				setEmailError("El email ya está en uso");
				setLoading(false);
			}
		},
	});
	return (
		<>
			<FormContainer>
				<HeaderTitle text="Crear cuenta" />
				<View style={styles.form}>
					<Input
						placeholder="Nombre"
						rightIcon={{
							type: "material-community",
							name: "account-outline",
							color: "#8f8f8f",
							iconStyle: styles.icon,
						}}
						errorMessage={
							formik.touched.nombre ? formik.errors.nombre : ""
						}
						returnKeyType="done"
						inputStyle={styles.input}
						inputContainerStyle={styles.inputContainer}
						placeholderTextColor="#686868"
						value={formik.values.nombre}
						onBlur={formik.handleBlur("nombre")}
						onChangeText={formik.handleChange("nombre")}
						errorStyle={{ color: ERROR_COLOR }}
					/>
					<Input
						placeholder="Correo Electrónico"
						rightIcon={{
							type: "material-community",
							name: "email-outline",
							color: "#8f8f8f",
							iconStyle: styles.icon,
						}}
						errorMessage={
							(formik.touched.email ? formik.errors.email : "") ||
							emailError
						}
						textContentType="emailAddress"
						keyboardType="email-address"
						autoCompleteType="email"
						autoCapitalize="none"
						returnKeyType="done"
						inputStyle={styles.input}
						inputContainerStyle={styles.inputContainer}
						placeholderTextColor="#686868"
						value={formik.values.email}
						onBlur={formik.handleBlur("email")}
						onChangeText={formik.handleChange("email")}
						onChange={() => setEmailError("")}
						errorStyle={{ color: ERROR_COLOR }}
					/>

					<Input
						placeholder="Contraseña"
						rightIcon={
							<Icon
								type="material-community"
								name={hiddenPass ? "eye-outline" : "eye"}
								color="#8f8f8f"
								iconStyle={styles.icon}
								onPress={() => setHiddenPass(!hiddenPass)}
							/>
						}
						errorMessage={
							formik.touched.password ? formik.errors.password : ""
						}
						secureTextEntry={hiddenPass}
						returnKeyType="done"
						inputStyle={styles.input}
						inputContainerStyle={styles.inputContainer}
						placeholderTextColor="#686868"
						value={formik.values.password}
						onChangeText={formik.handleChange("password")}
						onBlur={formik.handleBlur("password")}
						errorStyle={{ color: ERROR_COLOR }}
					/>
				</View>
			</FormContainer>

			<Button
				buttonStyle={styles.submit}
				title="Registrar"
				onPress={() => formik.handleSubmit()}
				loading={loading}
				disabled={loading}
			/>
			<View style={styles.cambiar}>
				<Text>¿Ya tienes cuenta? </Text>
				<Text
					style={[styles.alternativeTxt, { fontWeight: "bold" }]}
					onPress={() => setLoginComponent(true)}
				>
					Iniciar Sesión
				</Text>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	form: {
		flex: 1,
		justifyContent: "flex-start",
		marginTop: 20,
	},
	inputContainer: {
		borderBottomColor: "#8f8f8f",
		borderBottomWidth: 0.5,
		height: 28,
		paddingBottom: 10,
		marginTop: 10,
	},
	input: {
		fontSize: 16,
		fontWeight: "300",
	},
	icon: {
		fontSize: 20,
	},
	submit: {
		backgroundColor: PRIMARY_COLOR,
	},
	cambiar: {
		flexDirection: "row",
		paddingVertical: 10,
		marginTop: 20,
		justifyContent: "center",
	},
	alternativeTxt: {
		color: ALTERNATIVE_COLOR,
		fontWeight: "bold",
	},
});
