import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { Input, ListItem } from "react-native-elements";
import { CategoryContext } from "../../context/CategoryContext";
import { LocationContext } from "../../context/LocationContext";
import { ALTERNATIVE_SECONDARY_COLOR } from "../../utils/constants";

export default function FormPublish() {
  //TODO: Añadir un input para la categoría, 
	const navigation = useNavigation()
	const {location} = useContext(LocationContext)
	const {category} = useContext(CategoryContext)
	console.log(category);
	return (
		<View>
			<Input
				inputStyle={styles.input}
				containerStyle={{ paddingHorizontal: 0 }}
				inputContainerStyle={styles.divider}
				errorStyle={{ display: "none" }}
				placeholder="Escribe el título"
			/>
			<ListItem containerStyle={[styles.divider, styles.input]} onPress={() => navigation.navigate('Location')}>
				<ListItem.Content>
					<ListItem.Title style={{ color: ALTERNATIVE_SECONDARY_COLOR }}>
						{location?.municipio || 'Ciudad'}
					</ListItem.Title>
				</ListItem.Content>
				<ListItem.Chevron type="font-awesome" name="chevron-right" />
			</ListItem>
			<ListItem containerStyle={[styles.divider, styles.input]} onPress={() => navigation.navigate('Category')}>
				<ListItem.Content>
					<ListItem.Title style={{ color: ALTERNATIVE_SECONDARY_COLOR }}>
						{category?.category || 'Categoria'}
					</ListItem.Title>
				</ListItem.Content>
				<ListItem.Chevron type="font-awesome" name="chevron-right" />
			</ListItem>
		
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		backgroundColor: "#fff",
		paddingHorizontal: 14,
		paddingVertical: 20,
	},
	divider: {
		borderBottomWidth: 1,
		borderColor: "#dbdbdb",
	},
});
