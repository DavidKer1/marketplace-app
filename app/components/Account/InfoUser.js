import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import { FirebaseContext } from "../../context/firebase/FirebaseContext";
import { SECONDARY_COLOR } from "../../utils/constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import Loading from "../Loading";

export default function InfoUser() {
	const { user, firebase, setReloadUser, userInfo } = useContext(FirebaseContext);
	const [loading, setLoading] = useState(false);
	const [loadingText] = useState("Subiendo imagen");
	const changeAvatar = async () => {
		const resultPermision = await Permissions.askAsync(Permissions.CAMERA);
		const resultPermisionCamera = resultPermision.permissions.camera.status;

		if (resultPermisionCamera === "denied") {
			Toast.show({
				type: "info",
				autoHide: true,
				text1: "Es necesario tener permisos de la galeria",
				visibilityTime: 2500,
			});
		} else {
			const result = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				aspect: [4, 3],
			});

			if (!result.cancelled) {
				uploadImage(result.uri)
					.then((res) => {
						updatePhotoURL();
					})
					.catch(() => {
						Toast.show({
							type: "error",
							autoHide: true,
							text1:
								"Ha habido un problema al actualizar la foto, vuelve a intentarlo más tarde",
							visibilityTime: 2500,
						});
					});
			}
		}
	};

	const uploadImage = async (uri) => {
		setLoading(true);

		const response = await fetch(uri);
		const blob = await response.blob();

		const ref = firebase.storage().ref().child(`avatar/${user.uid}.jpg`);
		return ref.put(blob);
	};
	const updatePhotoURL = () => {
		firebase
			.storage()
			.ref(`avatar/${user.uid}.jpg`)
			.getDownloadURL()
			.then(async (URL) => {
				const update = {
					photoURL: URL,
				};
				await firebase.auth().currentUser.updateProfile(update);
				setLoading(false);
				setReloadUser(true);
			})
			.catch(() => {
				Toast.show({
					type: "error",
					autoHide: true,
					text1:
						"Ha habido un problema al actualizar la foto, vuelve a intentarlo más tarde",
					visibilityTime: 2500,
				});
			});
	};

	return (
		<>
			<View style={styles.container}>
				<Avatar
					rounded
					size="large"
					containerStyle={styles.userInfoAvatar}
					activeOpacity={0.7}
					
					onPress={changeAvatar}
					icon={{ name: "user", type: "font-awesome" }}
					source={{ uri: user.photoURL }}
				><Avatar.Accessory  size={20}/></Avatar>
				<View style={styles.data}>
					<Text>{user.displayName || "Anonimo"} </Text>
					<Text>{user.email}</Text>
					<Text>{userInfo.phoneNumber || 'Sin numero de teléfono'}</Text>
				</View>
				
				<Loading isVisible={loading} text={loadingText} />
			</View>
		</>
	);
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: SECONDARY_COLOR,
		paddingTop: 100,
		paddingBottom: 30,

		alignItems: "center",
		justifyContent: "center",
	},
	userInfoAvatar: {
		backgroundColor: "#7e7e7e",
	},
	data: {
		alignItems: "center",
		paddingVertical: 10,
	},
});
