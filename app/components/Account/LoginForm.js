import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Input, Button, Icon } from "react-native-elements";
import { useFormik } from "formik";
import * as yup from "yup";

import { ALTERNATIVE_COLOR, ERROR_COLOR, PRIMARY_COLOR } from "../../utils/constants";
import FormContainer from "../FormContainer";
import HeaderTitle from "../HeaderTitle";
import { FirebaseContext } from "../../context/firebase/FirebaseContext";

export default function RegisterForm({ setLoginComponent }) {
	const [hiddenPass, setHiddenPass] = useState(true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null)
	const { firebase } = useContext(FirebaseContext);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: yup.object().shape({
			email: yup
				.string()
				.required("El email es requerido")
				.email("El email no es válido"),
			password: yup
				.string()
				.required("La contraseña es requerida")
				.min(5, "La contraseña debe tener minimo 5 caracteres"),
		}),
		onSubmit: async(data) => {
			setLoading(true);
			try {
				await firebase.auth().signInWithEmailAndPassword(data.email, data.password)
			} catch (error) {
				setLoading(false)
				setError('Error en el email o en la contraseña')
			}
		},
	});
	return (
		<>
			<FormContainer>
				<HeaderTitle text="Iniciar sesión" />
				<View style={styles.form}>
					<Input
						placeholder="Correo Electrónico"
						rightIcon={{
							type: "material-community",
							name: "email-outline",
							color: "#8f8f8f",
							iconStyle: styles.icon,
						}}
						textContentType="emailAddress"
						keyboardType="email-address"
						autoCompleteType="email"
						autoCapitalize="none"
						
						returnKeyType="done"
						inputStyle={styles.input}
						inputContainerStyle={styles.inputContainer}
						labelStyle={styles.label}
						placeholderTextColor="#686868"
						value={formik.values.email}
						onChangeText={formik.handleChange("email")}
						onBlur={formik.handleBlur("email")}
						errorMessage={formik.touched.email ? formik.errors.email : ""}
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
						
						secureTextEntry={hiddenPass}
						returnKeyType="done"
						inputStyle={styles.input}
						inputContainerStyle={styles.inputContainer}
						labelStyle={styles.label}
						placeholderTextColor="#686868"
						value={formik.values.password}
						onChangeText={formik.handleChange("password")}
						onBlur={formik.handleBlur("password")}
						errorMessage={
							formik.touched.password ? formik.errors.password : ""
						}
						errorStyle={{ color: ERROR_COLOR }}
					/>
					{ error && <Text style={styles.error}>{error}</Text>}
				</View>
			</FormContainer>
			<Button
				buttonStyle={styles.submit}
				title="Iniciar sesión"
				onPress={() =>formik.handleSubmit()}
				loading={loading}
				disabled={loading}
			/>
			<View style={styles.cambiar}>
				<Text>¿Aún no tienes cuenta? </Text>
				<Text
					style={[styles.alternativeTxt, { fontWeight: "bold" }]}
					onPress={() => setLoginComponent(false)}
				>
					Crear cuenta
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
	error: {
		color: ERROR_COLOR
	}
});
