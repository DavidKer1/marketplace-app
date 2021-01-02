import React from "react";
import { View, Text } from "react-native";
import States from "../screens/States";
import Cities from "../screens/Cities";
import {
	createStackNavigator,
	HeaderBackButton,
} from "@react-navigation/stack";
import { SECONDARY_COLOR } from "../utils/constants";
const Stack = createStackNavigator();

export default function LocationStack() {
	return (
		<Stack.Navigator
			initialRouteName="States"
			screenOptions={{
				headerStyle: {
					backgroundColor: SECONDARY_COLOR,
				},
				headerTintColor: "#fff",
			}}
			mode="card"
		>
			<Stack.Screen
				name="States"
				component={States}
				options={{ title: "Estado", headerLeft: LeftComponent }}
			/>
			<Stack.Screen
				name="Cities"
				component={Cities}
				options={({ route }) => ({ title: route.params.estado })}
			/>
		</Stack.Navigator>
	);
}

const LeftComponent = (props) => (
	<HeaderBackButton {...props} label="Regresar" tintColor={"#fff"} />
);
