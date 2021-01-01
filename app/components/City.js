import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { LocationContext } from "../context/LocationContext";

export default function Municipio({ municipio, estado }) {
	const navigation = useNavigation();
	const {setLocation} = useContext(LocationContext)
	const handleSelect = () => {
		setLocation({municipio, estado})
		navigation.navigate("Publish")
	}
	return (
		<ListItem
			containerStyle={[styles.divider, styles.input]}
			onPress={handleSelect}
		>
			<ListItem.Content>
				<ListItem.Title>{municipio}</ListItem.Title>
			</ListItem.Content>
		</ListItem>
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
