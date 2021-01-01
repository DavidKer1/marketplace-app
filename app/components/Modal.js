
import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { Icon, Overlay, Button } from "react-native-elements";
import { ALTERNATIVE_SECONDARY_COLOR } from "../utils/constants";

export default function Modal({
	children,
	isVisible,
	setIsVisible,

}) {
	const togleVisible = () => {
		setIsVisible(!isVisible);
	};
	return (
		<>
			<Overlay
				isVisible={isVisible}
				backdropStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}
				overlayStyle={styles.overlay}
				onBackdropPress={togleVisible}
			>
				<>
					<View style={styles.header}>
						<Icon
							type="material-community"
							name="chevron-left"
							iconStyle={styles.left}
							onPress={togleVisible}
						/>
						
					</View>

					{children}
				</>
			</Overlay>
		</>
	);
}

const styles = StyleSheet.create({
	overlay: {
		height: Dimensions.get("window").height - 100,
		width: "90%",
		backgroundColor: "#fff",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	left: {
		fontSize: 36,
		padding: 0,
		color: "#8f8f8f",
		alignSelf: "flex-start",
	},
	button: {
		alignSelf: "flex-end",
	},
	titleBtn: {
		color: ALTERNATIVE_SECONDARY_COLOR,
	},
});
