import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Publications from '../screens/Publications';
import { SECONDARY_COLOR } from "../utils/constants";

const Stack = createStackNavigator()
export default function PublicationsStack() {
  return (
    <Stack.Navigator
      initialRouteName='Publications'
      screenOptions={{
				headerStyle: {
					backgroundColor: SECONDARY_COLOR,
        },
      }}
      
    >
      <Stack.Screen 
        name="Publications"
        component={Publications}
        options={{title: "Publicaciones"}}
      />

      
    </Stack.Navigator>
  )
}
