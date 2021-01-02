import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import Categories from '../screens/Category/Categories';

const Stack = createStackNavigator();

export default function CategoryStack() {
  
  return (
    <Stack.Navigator
			initialRouteName="Category"
			screenOptions={{
		
        headerTintColor: "#fff",
        headerShown: false
			}}
			mode="card"
		>
			<Stack.Screen
				name="Category"
				component={Categories}
				options={{ title: "Categoría" }}
			/>
		
		</Stack.Navigator>
  )
}
