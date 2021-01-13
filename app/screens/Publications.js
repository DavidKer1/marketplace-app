import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text, FlatList } from "react-native";
import { Card } from "react-native-elements";
import { FirebaseContext } from "../context/firebase/FirebaseContext";
import {
	ALTERNATIVE_SECONDARY_COLOR,
	LIMIT_PUBLICATIONS,
} from "../utils/constants";
import dayjs from "dayjs";
import "dayjs/locale/es";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);

import { formatDistanceToNow, format } from "date-fns";
import { es } from "date-fns/locale";

export default function Publications() {
	const { db } = useContext(FirebaseContext);
	const [totalPublications, setTotalPublications] = useState(0);
	const [pointer, setPointer] = useState(null);
	const [publications, setPublications] = useState([]);
	useEffect(() => {
		db.collection("publications")
			.get()
			.then((snap) => {
				setTotalPublications(snap.size);
			});

		const resultPublications = [];

		db.collection("publications")
			.orderBy("createdAt", "desc")
			.limit(LIMIT_PUBLICATIONS)
			.get()
			.then((snap) => {
				setPointer(snap.docs[snap.docs.length - 1]);
				snap.forEach((doc) => {
					resultPublications.push({ id: doc.id, ...doc.data() });
				});
				setPublications(resultPublications);
			});
	}, []);
	const renderItem = ({ item }) => <Item data={item} />;

	return (
		<View>
			<View style={styles.filtro}>
				<Text>Filtro</Text>
			</View>
			{publications ? (
				<FlatList
					data={publications}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
				/>
			) : (
				<Text>Cargando...</Text>
			)}
		</View>
	);
}

const Item = ({ data }) => {
	const {
		category,
		createdAt,
		createdBy,
		images,
		location,
		title,
		description,
		price,
	} = data;

	const localDate = format(createdAt.toMillis(), "eeee dd-MMMM-yyyy", {
		locale: es,
	});
	const formatToNow = formatDistanceToNow(createdAt.toDate(), { locale: es });

	const monthDiff = dayjs(createdAt.toDate()).diff(new Date(), "month");

	return (
		<Card>
			{images.length > 0 ? (
				<Card.Image source={{ uri: images[0] }} />
			) : (
				<NoImage />
			)}
			<Card.Divider />

			<Text style={[styles.title, styles.text]}>{title}</Text>
			<Text style={[styles.lightText, styles.text]}>
				{location?.municipio}, {location?.estado}
			</Text>

			<Text style={[styles.price, styles.text]}>$ {price || 0}</Text>
			{monthDiff < 0 ? (
				<Text style={[styles.date, styles.text, styles.lightText, {textTransform:'capitalize'}]}> {localDate}</Text>
			) : (
				<Text style={[styles.date, styles.text, styles.lightText]}>Hace {formatToNow}</Text>
			)}
		</Card>
	);
};

const NoImage = () => (
	<Card.Image style={styles.imagen}>
		<Text style={{ color: "#fff" }}>No hay fotografías para mostrar.</Text>
	</Card.Image>
);

const styles = StyleSheet.create({
	filtro: {
		backgroundColor: ALTERNATIVE_SECONDARY_COLOR,
		padding: 12,
	},
	imagen: {
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		marginVertical: 2,
	},

	title: {
		fontSize: 17,
		fontWeight: "bold",
		color: "#363636",
	},
	lightText: {
		color: "#838383",
		fontSize: 12,
	},
	date: {
		marginTop: 30
	},
	price: {
		color: ALTERNATIVE_SECONDARY_COLOR,
		fontSize: 16,
	},
});
