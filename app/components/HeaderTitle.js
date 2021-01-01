import React from "react";
import { Text } from "react-native-elements";
import { View } from "react-native";
import { GRAY_COLOR } from "../utils/constants";
export default function HeaderTitle({text}) {
	return (
		<View
			style={{
				paddingVertical: 10,
				paddingHorizontal: 10,
			}}
		>
			<Text
				h3
				style={{
					fontWeight: "bold",
					color: GRAY_COLOR,
				}}
			>
				{text}
			</Text>
		</View>
	);
}
