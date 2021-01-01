import React from 'react'
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

export default function Municipio({item, navigation}) {
	const { estado, municipios } = item;
	return (
		<ListItem
			containerStyle={[styles.divider, styles.input]}
			onPress={() => navigation.navigate("Cities", {estado ,municipios }) }
		>
			<ListItem.Content>
				<ListItem.Title>
					{estado}
				</ListItem.Title>
			</ListItem.Content>
			<ListItem.Chevron type="font-awesome" name="chevron-right" />
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