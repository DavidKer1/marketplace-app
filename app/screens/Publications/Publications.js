import React, { useCallback, useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text, FlatList } from "react-native";
import Card from '../../components/Publications/Card'
import { FirebaseContext } from "../../context/firebase/FirebaseContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
	LIMIT_PUBLICATIONS,
} from "../../utils/constants";

import { ActivityIndicator } from "react-native";

export default function Publications() {
	const { db } = useContext(FirebaseContext);
	const [totalPublications, setTotalPublications] = useState(0);
	const [pointer, setPointer] = useState(null);
	const [publications, setPublications] = useState([]);
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation()
	useFocusEffect(
		useCallback(() => {
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
		}, []),
	);

	const handleMore = () => {
		const resultPublications = [];
		if (publications.length < totalPublications) setLoading(true);
		db.collection("publications")
			.orderBy("createdAt", "desc")
			.startAfter(pointer.data().createdAt)
			.limit(LIMIT_PUBLICATIONS)
			.get()
			.then((response) => {
				if (response.docs.length > 0) {
					setPointer(response.docs[response.docs.length - 1]);
				} else {
					setLoading(false);
				}

				response.forEach((doc) => {
					const publication = doc.data();
					resultPublications.push({ id: doc.id, ...publication });
				});
				setPublications([...publications, ...resultPublications]);
			});
	};

	const renderItem = ({ item }) => <Card navigation={navigation} data={item} />;

	return (
		<View>
			{publications ? (
				<FlatList
					data={publications}
					style={{ marginBottom: 30 }}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					onEndReachedThreshold={0.5}
					onEndReached={handleMore}
					ListFooterComponent={<FooterList loading={loading} />}
				/>
			) : (
				<Text>Cargando...</Text>
			)}
		</View>
	);
}

function FooterList(props) {
	const { loading } = props;
	if (loading) {
		return (
			<View style={styles.loading}>
				<ActivityIndicator size="large" />
			</View>
		);
	} else {
		return (
			<View style={styles.loading}>
				<Text>No quedan mas publicaciones</Text>
			</View>
		);
	}
}



const styles = StyleSheet.create({
	loading: {
		marginTop: 10,
		marginBottom: 10,
		alignItems: "center",
	},
});
