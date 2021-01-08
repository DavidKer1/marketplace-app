import { useFormik } from "formik";
import React, {
	forwardRef,
	useContext,
	useImperativeHandle,
	useState,
} from "react";
import { StyleSheet, ScrollView, View,  } from "react-native";
import { Input,} from "react-native-elements";
import { FirebaseContext } from "../../../context/firebase/FirebaseContext";
import HeaderTitle from "../../HeaderTitle";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import Loading from "../../Loading";
import { SECONDARY_COLOR } from "../../../utils/constants";

const EditarPerfil = forwardRef((props, ref) => {
	const { user, firebase, setReloadUser, userInfo, db } = useContext(
		FirebaseContext,
	);

	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();

	const handleSubmit = () => {
		formik.handleSubmit();
	};

	useImperativeHandle(
		ref,
		() => ({
			handleSubmit,
		}),
		[],
	);

	const formik = useFormik({
		initialValues: {
			email: user.email,
			displayName: user.displayName,
			phoneNumber: userInfo.phoneNumber || "",
		},
		validationSchema: yup.object().shape({
			email: yup
				.string()
				.required("El correo electrónico es requerido")
				.email("El email no es valido"),
			displayName: yup
				.string()
				.required("El nombre es requerido")
				.min(2, "El nombre debe ser de minimo dos letras")
				.max(50, "El nombre es demasiado largo"),
			phoneNumber: yup
				.string()
				.matches(
					/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
					"El numero de telefono no es valido",
				),
		}),
		onSubmit: async (data) => {
			const { email, displayName, phoneNumber } = data;
			setLoading(true);
			const user = firebase.auth().currentUser;
			let userInfo = db.collection("users").doc(user.uid);

			try {
				await user.updateEmail(email);
				await user.updateProfile({
					displayName,
				});

				await userInfo.update({
					phoneNumber,
				});
				Toast.show({
					type: "success",
					position: "top",
					text1: "Usuario actualizado correctamente.",
					visibilityTime: 2500,
					autoHide: true,
				});
				setReloadUser(true);

				navigation.navigate("Account");
			} catch (error) {
				setLoading(false);
				let errorMessage = "No se ha podido actualizar los datos";
				let errorMessage2 = "Intentalo mas tarde.";

				console.log(error.code);
				if (error.code === "auth/requires-recent-login") {
					errorMessage = "Requiere reautenticacion";
					errorMessage2 = "Cierre y vuelva a iniciar sesión";
				}

				if (error.code === "auth/email-already-in-use") {
					errorMessage = "El correo que ingresó ya está en uso";
					errorMessage2 =
						"Vuelva a intentarlo con otro correo electrónico";
				}
				Toast.show({
					type: "error",
					position: "top",
					text1: errorMessage,
					text2: errorMessage2,
					visibilityTime: 2500,
					autoHide: true,
				});
			}
			setReloadUser(true);
		},
	});

	

	return (
		<>
			<ScrollView style={styles.container}>
				<HeaderTitle text="Editar Perfil" />

				<View>			
					<Input
						rightIcon={{type:"material-community", name:"email-outline", color: "#8f8f8f"}}

						inputContainerStyle={styles.divider}
						containerStyle={styles.inputContainer}
						errorStyle={{ display: "none" }}
						inputStyle={styles.input}

						
						textContentType="emailAddress"
						keyboardType="email-address"
						autoCompleteType="email"
						autoCapitalize="none"
						returnKeyType="done"
						value={formik.values.email}
						onBlur={formik.handleBlur("email")}
						onChangeText={formik.handleChange("email")}
						errorMessage={formik.errors.email}
					/>
				</View>

				<View>
					
					<Input
						rightIcon={{type:"material-community", name:"account-outline", color: "#8f8f8f"}}
						inputContainerStyle={styles.divider}
						containerStyle={styles.inputContainer}
						errorStyle={{ display: "none" }}
						inputStyle={styles.input}

						returnKeyType="done"
						value={formik.values.displayName}
						onBlur={formik.handleBlur("displayName")}
						onChangeText={formik.handleChange("displayName")}
						errorMessage={formik.errors.displayName}
					/>
		
				</View>

				<Input
					rightIcon={{
						type: "material-community",
						name: "phone-outline",
						color: "#8f8f8f",
					}}
					inputContainerStyle={styles.divider}
					containerStyle={styles.inputContainer}
					inputStyle={styles.input}
					errorStyle={{ display: "none" }}
					returnKeyType="done"
					keyboardType="numeric"
					value={formik.values.phoneNumber}
					onBlur={formik.handleBlur("phoneNumber")}
					onChangeText={formik.handleChange("phoneNumber")}
					errorMessage={
						formik.touched.phoneNumber ? formik.errors.phoneNumber : ""
					}
					placeholder="800-555-1234"
				/>
				<Loading isVisible={loading} text="Actualizando usuario" />
			</ScrollView>
		</>
	);
});
const styles = StyleSheet.create({
	container: {
		marginTop: 12,
	},
	headerTitle: {
		paddingTop: 0,
	},
	input: {
		backgroundColor: "#fff",
		paddingHorizontal: 14,
		paddingVertical: 20,
	},
	divider: {
		borderBottomWidth: 1,
		borderColor: "#dbdbdb",
	},
	inputContainer: {
		paddingHorizontal: 0,
		backgroundColor: "#fff",
		position: "relative",
		paddingRight: 10
	},
	info: {
		backgroundColor: SECONDARY_COLOR,
		height: "100%",
		width: "100%",
		position: "absolute",
	},

	
});

export default EditarPerfil;
