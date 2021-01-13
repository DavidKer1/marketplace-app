import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, ListItem } from "react-native-elements";
import { CategoryContext } from "../../context/CategoryContext";
import { LocationContext } from "../../context/LocationContext";
import { ALTERNATIVE_SECONDARY_COLOR } from "../../utils/constants";

export default function FormPublish({titulo, descripcion,setDescripcion, setTitulo, precio, setPrecio}) {
	//TODO: Añadir un input para la categoría,
	const navigation = useNavigation();
	const { location } = useContext(LocationContext);
	const { category } = useContext(CategoryContext);

	const precioConverter = (e) => {
		const nuevoPrecio = parseInt(e)
		if (nuevoPrecio > 0) {
      setPrecio(nuevoPrecio);
    }
    if (!nuevoPrecio) {
      setPrecio(0);
    }
	}
	return (
		<>
			<View>
				<Input
					maxLength={50}
					inputStyle={styles.input}
					containerStyle={{ paddingHorizontal: 0 }}
					inputContainerStyle={styles.divider}
					errorStyle={{ display: "none" }}
					placeholder="Escribe el título"
					value={titulo}
					onChangeText={(e) => setTitulo(e)}
				/>
				<Input
					multiline={true}
					inputStyle={[styles.input, { paddingTop: 20 }]}
					containerStyle={{ paddingHorizontal: 0 }}
					inputContainerStyle={styles.divider}
					errorStyle={{ display: "none" }}
					placeholder="Descripción"
					maxLength={250}
					value={descripcion}
					onChangeText={(e) => setDescripcion(e)}
				/>
				<Text style={[styles.maximo, styles.divider]}>
					Máximo 250 caracteres
				</Text>
				<Input
					multiline={true}
					inputStyle={[styles.input, { paddingTop: 20 }]}
					containerStyle={{ paddingHorizontal: 0 }}
					inputContainerStyle={styles.divider}
					errorStyle={{ display: "none" }}
					keyboardType='numeric'
					placeholder="Precio"
					maxLength={10}
					value={precio.toString()}
					onChangeText={precioConverter}
				/>
				<ListItem
					containerStyle={[styles.divider, styles.input]}
					onPress={() => navigation.navigate("Location")}
				>
					<ListItem.Content>
						<ListItem.Title
							style={{ color: ALTERNATIVE_SECONDARY_COLOR }}
						>
							{location?.municipio || "Ciudad"}
						</ListItem.Title>
					</ListItem.Content>
					<ListItem.Chevron type="font-awesome" name="chevron-right" />
				</ListItem>

				<ListItem
					containerStyle={[styles.divider, styles.input]}
					onPress={() => navigation.navigate("Category")}
				>
					<ListItem.Content>
						<ListItem.Title
							style={{ color: ALTERNATIVE_SECONDARY_COLOR }}
						>
							{category?.category || "Categoria"}
						</ListItem.Title>
					</ListItem.Content>
					<ListItem.Chevron type="font-awesome" name="chevron-right" />
				</ListItem>
			</View>
		</>
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
	maximo: {
		paddingLeft: 10,
		marginBottom: 20,
		marginTop: 5,
		fontSize: 12,
		color: "#7c7c7c",
	},
});
