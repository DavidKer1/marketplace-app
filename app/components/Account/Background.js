import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../utils/constants";
import BackgroundAnimation from "../BackgroundAnimation";

export default function Background() {
	return (
		<View style={styles.bgContainer}>
			<BackgroundAnimation />
			<View style={{ flex: 1, backgroundColor: SECONDARY_COLOR }}></View>
			<View style={{ flex: 1, backgroundColor: PRIMARY_COLOR }}></View>
			<View style={styles.bgComplement}></View>
		</View>
	);
}

const styles = StyleSheet.create({
	bgContainer: {
		flex: 1,
		position: "absolute",
		top: 0,
		height: "100%",
		width: "100%",
  },
  bgComplement: {
		position: "absolute",
		top: "50%",
		left: -100,
		width: "200%",
		height: 0,
		backgroundColor: "transparent",
		borderStyle: "solid",
		borderLeftWidth: Dimensions.get("window").width + 100,
		borderTopWidth: 100,
		borderLeftColor: "transparent",
		borderTopColor: SECONDARY_COLOR,
	},
});
