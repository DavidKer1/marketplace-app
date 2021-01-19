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
				<ListItem bottomDivider>
					<Icon
						name={"application"}
						type={"material-community"}
						color={ALTERNATIVE_SECONDARY_COLOR}
					/>
					<ListItem.Content>
						<ListItem.Title>Mis anuncios</ListItem.Title>
					</ListItem.Content>
					<ListItem.Chevron type="font-awesome" name="chevron-right" />
				</ListItem>

				<ListItem
					bottomDivider
					onPress={() => navigation.navigate("Favorites")}
				>
					<Icon
						name={"heart"}
						type={"material-community"}
						color={ALTERNATIVE_COLOR}
					/>
					<ListItem.Content>
						<ListItem.Title>Favoritos</ListItem.Title>
					</ListItem.Content>
					<ListItem.Chevron type="font-awesome" name="chevron-right" />
				</ListItem>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
	},
});
