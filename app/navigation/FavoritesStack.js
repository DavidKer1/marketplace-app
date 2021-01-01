import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Favorites from "../screens/Favorites";
import { SECONDARY_COLOR } from "../utils/constants";

const Stack = createStackNavigator();
export default function FavoritesStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: SECONDARY_COLOR,
				},
			}}
		>
			<Stack.Screen
				name="Favorites"
				component={Favorites}
				options={{
					title: "Favoritos",
				}}
			/>
		</Stack.Navigator>
	);
}
