import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { size, map } from "lodash";
export default function ImageSlider({setImagesSelected, imagesSelected}) {
	const imageSelect = async () => {
		const resultPermissions = await Permissions.askAsync(Permissions.CAMERA);
		const resultPermisionCamera = resultPermissions.permissions.camera.status;
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
				setImagesSelected((state) => [...state, result.uri]);
			}
		}
	};

	const removeImage = (removeImage) => {
		setImagesSelected(
			imagesSelected.filter((image) => image !== removeImage),
		);
	};

	return (
		<ScrollView contentContainerStyle={styles.scroll} horizontal showsHorizontalScrollIndicator={false}>
			{size(imagesSelected) < 10 ? (
				<Avatar
					rounded
					size="large"
					containerStyle={styles.uploadContainer}
					activeOpacity={0.7}
					icon={{ name: "photo", type: "font-awesome" }}
					onPress={imageSelect}
				>
					<Avatar.Accessory
						size={20}
						type="font-awesome"
						name="arrow-up"
					/>
				</Avatar>
			) : null}

			{map(imagesSelected, (image, key) => (
				<Avatar
					key={key}
					rounded
					size="large"
					containerStyle={styles.uploadContainer}
					source={{ uri: image }}
					activeOpacity={0.7}
					icon={{ name: "photo", type: "font-awesome" }}
				>
					<Avatar.Accessory
						size={20}
						type="font-awesome"
						name="times"
						onPress={() => removeImage(image)}
					/>
				</Avatar>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scroll: {
		paddingVertical: 20,
		paddingLeft: "40%",
		paddingRight: 20,
	},
	uploadContainer: {
		backgroundColor: "#7e7e7e",
		marginHorizontal: 5,
	},
});
