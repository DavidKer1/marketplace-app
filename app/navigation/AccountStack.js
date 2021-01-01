import React, { useContext, useEffect, useRef, useState } from "react";
import {
	createStackNavigator,
	HeaderBackButton,
} from "@react-navigation/stack";
import Account from "../screens/Account/Account";
import { SECONDARY_COLOR } from "../utils/constants";
import { FirebaseContext } from "../context/firebase/FirebaseContext";

import EditarPerfil from "../components/Account/AccountOptions/EditarPerfil";

import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

const Stack = createStackNavigator();
export default function AccountStack() {
	const submitRef = useRef(null);
	const handleRightButtonPress = () => {
		submitRef.current.handleSubmit();
	};
	




	return (
		<>
			<Stack.Navigator
				screenOptions={{
					headerTintColor: "#fff",
				}}

				mode="modal"
			>
				<Stack.Screen
					name="Account"
					component={Account}
					options={{
						title: "Cuenta",
						headerTintColor: "#fff",
						headerTransparent: true,
					}}
				/>

				<Stack.Screen
					name="EditarPerfil"
					options={{
						title: "Editar Perfil",
						headerStyle: styles.header,
						headerRight: (props) => (
							<RightButton
								handleRightButtonPress={handleRightButtonPress}
								{...props}
							/>
						),
						headerLeft: LeftComponent,
						cardStyle: styles.card,
					}}
					children={() => <EditarPerfil ref={submitRef} />}
				/>
				
			</Stack.Navigator>
		</>
	);
}

const LeftComponent = (props) => (
	<HeaderBackButton {...props} label="Regresar" tintColor={"#fff"} />
);

const RightButton = (props) => {
	const handlePress = () => {
		props.handleRightButtonPress();
		
	};
	return (
		<View style={styles.btnContainer}>
			<Button
				title={"Editar"}
				type="clear"
				containerStyle={styles.button}
				titleStyle={styles.titleBtn}
				onPress={handlePress}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#e2e2e2",
	},
	header: {
		backgroundColor: SECONDARY_COLOR,
	},
	
	btnContainer: {
		marginRight: 8,
	},
	titleBtn: {
		color: "#fff",
	},
});
