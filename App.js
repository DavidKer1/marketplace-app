import "react-native-gesture-handler";
import React from "react";
import Navigation from "./app/navigation/Navigation";
import FirebaseProvider from "./app/context/firebase/FirebaseContext";
import Toast, { BaseToast } from "react-native-toast-message";
import {
	ALTERNATIVE_SECONDARY_COLOR,
	ERROR_COLOR,
	PRIMARY_COLOR,
} from "./app/utils/constants";
import LocationProvider from "./app/context/LocationContext";
import CategoryProvider from "./app/context/CategoryContext";
export default function App() {
	const toastConfig = {
		success: ({ text1, ...rest }) => (
			<BaseToast
				{...rest}
				style={{ borderLeftColor: PRIMARY_COLOR, marginTop: 10 }}
				contentContainerStyle={{ paddingHorizontal: 10 }}
				text1={text1}
				// text1Style={{ fontSize: 16, fontWeight: "300" }}
				trailingIconStyle={{ opacity: 0 }}
			/>
		),
		info: ({ text1, ...rest }) => (
			<BaseToast
				{...rest}
				style={{
					borderLeftColor: ALTERNATIVE_SECONDARY_COLOR,
					marginTop: 10,
				}}
				contentContainerStyle={{ paddingHorizontal: 10 }}
				text1={text1}
				// text1Style={{ fontSize: 16, fontWeight: "300" }}
				trailingIconStyle={{ opacity: 0 }}
			/>
		),
		error: ({ text1, ...rest }) => (
			<BaseToast
				{...rest}
				style={{ borderLeftColor: ERROR_COLOR, marginTop: 10 }}
				contentContainerStyle={{ paddingHorizontal: 10 }}
				text1={text1}
				// text1Style={{ fontSize: 16, fontWeight: "300" }}
				trailingIconStyle={{ opacity: 0 }}
			/>
		),
	};

	return (
		<>
			<FirebaseProvider>
				<LocationProvider>
					<CategoryProvider>
						<Navigation />
						<Toast
							config={toastConfig}
							ref={(ref) => Toast.setRef(ref)}
						/>
					</CategoryProvider>
				</LocationProvider>
			</FirebaseProvider>
		</>
	);
}
