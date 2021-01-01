import React, { useContext } from "react";
import { View } from "react-native";
import {  Button } from "react-native-elements";
import InfoUser from "../../components/Account/InfoUser";
import { FirebaseContext } from "../../context/firebase/FirebaseContext";
import { PRIMARY_COLOR } from "../../utils/constants";
import AccountOptions from "../../components/Account/AccountOptions/";


export default function UserLogged() {
	const { firebase } = useContext(FirebaseContext);

	const cerrarSesion = async () => {
		await firebase.auth().signOut();
	};

	return (
		<View style={{ flex: 1 }}>
			<InfoUser />
			<AccountOptions />

			<Button
				buttonStyle={{ backgroundColor: PRIMARY_COLOR }}
				title="Cerrar Sesión"
				onPress={() => cerrarSesion()}
			/>

		</View>
	);
}
