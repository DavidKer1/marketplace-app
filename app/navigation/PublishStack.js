import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SECONDARY_COLOR } from "../utils/constants";
import Publish from "../screens/Publish/Publish";
import { FirebaseContext } from "../context/firebase/FirebaseContext";
import UserGuest from "../screens/Account/UserGuest";
const Stack = createStackNavigator();
export default function PublishStack() {
	const { isAuth, user } = useContext(FirebaseContext);
  if(user === null) return <Loading isVisible={true} text={'Cargando...'} />

	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: SECONDARY_COLOR,
					
				},
				headerTintColor: '#fff'
			}}
			mode="modal"
		>
			{isAuth ? (
				<Stack.Screen
					name="Publish"
					component={Publish}
					options={{
						title: "Publicar",
					}}
				/>
			
			) : (
				<Stack.Screen
					name="UserGuest"
					component={UserGuest}
					options={{
						headerTransparent: true,
						title: "Publicar"
					}}
				/>
			)}
		</Stack.Navigator>
	);
}
