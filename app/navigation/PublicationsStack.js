import React from "react";
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";
import Publications from "../screens/Publications/Publications";
import { SECONDARY_COLOR } from "../utils/constants";
import Publication from "../screens/Publications/Publication";

const Stack = createStackNavigator();
export default function PublicationsStack() {
	return (
		<Stack.Navigator
			initialRouteName="Publications"
			screenOptions={{
				headerStyle: {
					backgroundColor: SECONDARY_COLOR,
				},
				headerTintColor: "#fff",
			}}
		>
			<Stack.Screen
				name="Publications"
				component={Publications}
				options={{ title: "Publicaciones" }}
			/>
			<Stack.Screen
				name="Publication"
				component={Publication}
				options={({ route }) => ({
					title: String(route.params.data.title || 'Publicación').slice(0,16) + (String(route.params.data.title).length > 16 ? '...' :'') , 
          headerLeft: LeftComponent,
				})}
			/>
		</Stack.Navigator>
	);
}


const LeftComponent = (props) => (
	<HeaderBackButton {...props} label="Regresar" tintColor={"#fff"} />
);