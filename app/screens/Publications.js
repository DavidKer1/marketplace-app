import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { FirebaseContext } from "../context/firebase/FirebaseContext";
import { LIMIT_PUBLICATIONS } from "../utils/constants";

export default function Publications() {
	const { db } = useContext(FirebaseContext);
	const [totalPublications, setTotalPublications] = useState(0);
	const [pointer, setPointer] = useState(null);

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
						console.log(doc.data());
					});
				});
	
	}, []);

	return (
		<View>
			<Text>Publications</Text>
		</View>
	);
}
