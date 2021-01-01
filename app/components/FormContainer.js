import React from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
  View,
} from "react-native";

export default function FormContainer({ children }) {
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View
					style={{  paddingVertical: 14, flex: 1 }}
				>
					{children}
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
