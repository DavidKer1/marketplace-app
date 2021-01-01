import React from "react";
import { View } from "react-native";
import { map } from "lodash";
import { Icon, ListItem } from "react-native-elements";
import {
	ALTERNATIVE_COLOR,
	ALTERNATIVE_SECONDARY_COLOR,
	GRAY_COLOR,
} from "../../../utils/constants";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function AccountOptions() {
	const menuOptions = generateOptions();
	const navigation = useNavigation();
	return (
		<>
			<View style={styles.container}>
				<ListItem
					bottomDivider
					onPress={() => navigation.navigate("EditarPerfil")}
				>
					<Icon
						name="account"
						type="material-community"
						color={GRAY_COLOR}
					/>
					<ListItem.Content>
						<ListItem.Title>Editar Perfil</ListItem.Title>
					</ListItem.Content>
					<ListItem.Chevron type="font-awesome" name="chevron-right" />
				</ListItem>
			</View>
			<View style={styles.container}>
				{map(menuOptions, (menu, index) => (
					<ListItem
						key={index}
						bottomDivider
						onPress={menu.onPressFunction}
					>
						<Icon
							name={menu.icon}
							type={menu.iconType}
							color={menu.iconColor}
						/>
						<ListItem.Content>
							<ListItem.Title>{menu.title}</ListItem.Title>
						</ListItem.Content>
						<ListItem.Chevron type="font-awesome" name="chevron-right" />
					</ListItem>
				))}
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
	},
});

function generateOptions() {
	return [
		{
			title: "Mis anuncios",
			icon: "application",
			iconType: "material-community",
			iconColor: ALTERNATIVE_SECONDARY_COLOR,
		},
		{
			title: "Favoritos",
			icon: "heart",
			iconType: "material-community",
			iconColor: ALTERNATIVE_COLOR,
		},
	];
}
