import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import PublicationsStack from "./PublicationsStack";
import AccountStack from "./AccountStack";
import FavoritesStack from "./FavoritesStack";
import PublishStack from "./PublishStack";
import SearchStack from "./SearchStack";
import LocationStack from "./LocationStack";

import {
	ALTERNATIVE_COLOR,
	ALTERNATIVE_SECONDARY_COLOR_DARK,
	SECONDARY_COLOR,
} from "../utils/constants";
import { createStackNavigator } from "@react-navigation/stack";
import CategoryStack from "./CategoryStack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export default function Navigation() {
	return (
		<>
			<NavigationContainer>
				<Stack.Navigator
					mode={"modal"}
					initialRouteName="Home"
					screenOptions={{
						headerStyle: {
							backgroundColor: SECONDARY_COLOR,
						},
						headerTintColor: "#fff",
					}}
				>
					<Stack.Screen
						name="Home"
						component={HomeTab}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Location"
						component={LocationStack}
						options={{ title: "Ciudad", headerShown: false }}
					/>
					<Stack.Screen
						name="Category"
						component={CategoryStack}
						options={{
							title: "Categoría",
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}

const HomeTab = () => {
	return (
		<Tab.Navigator
			initialRouteName="Publications"
			tabBarOptions={{
				inactiveTintColor: "#646464",
				activeTintColor: ALTERNATIVE_COLOR,
				style: {
					paddingVertical: 5,
					marginBottom: 10,
					paddingHorizontal: "2.5%",
				},
				showLabel: false,
			}}
			screenOptions={({ route, navigation }) => ({
				tabBarIcon: ({ color }) => screenOptions(route, color, navigation),
			})}
		>
			<Tab.Screen
				name="Publications"
				component={PublicationsStack}
				options={{
					title: "Publicaciones",
				}}
			/>
			<Tab.Screen
				name="Favorites"
				component={FavoritesStack}
				options={{
					title: "Favoritos",
				}}
			/>
			<Tab.Screen
				name="Publish"
				component={PublishStack}
				options={{
					title: "Publicar",
				}}
			/>
			<Tab.Screen
				name="Search"
				component={SearchStack}
				options={{
					title: "Buscar",
				}}
			/>
			<Tab.Screen
				name="Account"
				component={AccountStack}
				options={{
					title: "Cuenta",
				}}
			/>
		</Tab.Navigator>
	);
};

const screenOptions = (route, color, navigation) => {
	let iconName;
	switch (route.name) {
		case "Publications":
			iconName = "shopping-outline";
			break;
		case "Favorites":
			iconName = "heart-outline";
			break;
		case "Publish":
			iconName = "plus-circle";
			color = SECONDARY_COLOR;
			if (navigation.isFocused()) {
				color = ALTERNATIVE_SECONDARY_COLOR_DARK;
			}

			break;
		case "Search":
			iconName = "magnify";
			break;
		case "Account":
			iconName = "account-outline";
			break;
	}
	return (
		<Icon type="material-community" name={iconName} size={26} color={color} />
	);
};
