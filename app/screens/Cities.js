import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, FlatList } from "react-native";
import City from '../components/City'
export default function Cities(props) {
	const {
		route: {
			params: { estado, municipios },
		},
  } = props;
	return (
		<View>
			<FlatList
				data={municipios}
				renderItem={({ item }) => (
					<City municipio={item} estado={estado}/>
				)}
				keyExtractor={(item) => item}
			/>
		</View>
	);
}
