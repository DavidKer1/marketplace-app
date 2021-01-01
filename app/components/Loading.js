import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";
import { GRAY_COLOR } from "../utils/constants";
export default function Loading(props) {
	const { isVisible, text } = props;
	return (
		<Overlay
			isVisible={isVisible}
			backdropStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
			overlayStyle={styles.overlay}
			
		>
			<View style={styles.view}>
				<ActivityIndicator size="large" color={GRAY_COLOR} />
				{text && <Text style={styles.text}>{text}</Text>}
			</View>
		</Overlay>
	);
}

const styles = StyleSheet.create({
	overlay: {
		height: 100,
		width: 200,
		backgroundColor: "#fff",
		borderRadius: 10,
	},
	view: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		color: GRAY_COLOR,
		textTransform: "uppercase",
		marginTop: 10,
	},
});
