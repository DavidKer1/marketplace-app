import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "../screens/Search";
import { SECONDARY_COLOR } from "../utils/constants";
const Stack = createStackNavigator();
export default function SearchStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: SECONDARY_COLOR,
				},
			}}
		>
			<Stack.Screen
				name="Search"
				component={Search}
				options={{
					title: "Buscar",
				}}
			/>
		</Stack.Navigator>
	);
}
