import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";
import { FirebaseContext } from "../../context/firebase/FirebaseContext";
import {
	ALTERNATIVE_SECONDARY_COLOR_DARK,
	SECONDARY_COLOR,
} from "../../utils/constants";

export default function Description({ data, localDate }) {
	const {
		title,
		price,
		location,
		category: { category },
		description,
		createdBy,
  } = data;
  const [userNumber, setUserNumber] = useState('')

	const { db } = useContext(FirebaseContext);

	useEffect(() => {
		db.collection("users")
			.doc(createdBy)
			.onSnapshot((snapshot) => {
				setUserNumber(snapshot.data().phoneNumber);
			});
  }, []);
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>

			<View style={styles.info}>
				<Text style={styles.price}>$ {price || "0"}</Text>
				<Text style={styles.date}>{localDate}</Text>
			</View>
			<Card.Divider />

			<View style={styles.info}>
				<Text style={{ fontWeight: "300" }}>Municipio:</Text>
				<Text>{location?.municipio}</Text>
			</View>
			<View style={styles.info}>
				<Text style={{ fontWeight: "300" }}>Estado:</Text>
				<Text>{location?.estado}</Text>
			</View>
			<View style={styles.info}>
				<Text style={{ fontWeight: "300" }}>Categoría:</Text>
				<Text>{category}</Text>
			</View>
			<View style={styles.info}>
				<Text style={{ fontWeight: "300" }}>Teléfono:</Text>
				<Text>{userNumber}</Text>
			</View>
			<Card.Divider />
			<Text style={{ paddingBottom: 30 }}>{description}</Text>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		paddingHorizontal: "4%",
		paddingVertical: 10,
	},
	title: {
		color: ALTERNATIVE_SECONDARY_COLOR_DARK,
		fontSize: 25,
		fontWeight: "300",
		textTransform: "uppercase",
		paddingBottom: 10,
	},
	info: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingBottom: 10,
	},
	price: {
		color: SECONDARY_COLOR,
		fontSize: 20,
		fontWeight: "bold",
	},
	date: {
		color: "#444",
		fontSize: 12,
	},
});
