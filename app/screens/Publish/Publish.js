import React, { useContext, useState } from "react";
import uuid from "random-uuid-v4";
import { ScrollView } from "react-native";
import { Button } from "react-native-elements";
import FormContainer from "../../components/FormContainer";
import FormPublish from "../../components/Publish/FormPublish";
import ImageSlider from "../../components/Publish/ImageSlider";
import { CategoryContext } from "../../context/CategoryContext";
import { FirebaseContext } from "../../context/firebase/FirebaseContext";
import { LocationContext } from "../../context/LocationContext";
import { SECONDARY_COLOR } from "../../utils/constants";
import Loading from "../../components/Loading";
import Toast from "react-native-toast-message";

export default function Publish(props) {
	const { user, firebase, db } = useContext(FirebaseContext);

	const { category, clearCategory } = useContext(CategoryContext);
	const { location, clearLocation } = useContext(LocationContext);

	const [titulo, setTitulo] = useState("");
	const [descripcion, setDescripcion] = useState("");
	const [imagesSelected, setImagesSelected] = useState([]);

	const [uploading, setUploading] = useState(false);
	const handleSubmit = () => {
		if (!titulo || !descripcion || !category || !location) {
			Toast.show({
				type: "error",
				text1: "Todos los campos son obligatorios",
			});
		} else {
			setUploading(true);
			uploadImage().then((res) => {
				setUploading(false);
				db.collection("publications")
					.add({
						title: titulo,
						location,
						category,
						images: res,
						createdAt: new Date(),
						createdBy: user.uid,
					})
					.then(() => {
						Toast.show({
							type: "success",
							text1: "Publicación subida correctamente",
						});
						clearForm();
					
					})
					.catch(() => {
						Toast.show({
							type: "error",
							text1: "Hubo un error al subir su publicación",
							text2: ", Intentelo mas tarde.",
						});
					});
			});
		}
	};

	const uploadImage = async () => {
		const imageBlob = [];

		await Promise.all(
			imagesSelected.map(async (image) => {
				const response = await fetch(image);
				const blob = await response.blob();

				const ref = firebase.storage().ref("publications").child(uuid());
				await ref.put(blob).then(async (res) => {
					await firebase
						.storage()
						.ref(`publications/${res.metadata.name}`)
						.getDownloadURL()
						.then((photoURL) => imageBlob.push(photoURL));
				});
			}),
		);

		return imageBlob;
	};

	const clearForm = () => {
		clearCategory();
		clearLocation();
		setTitulo("");
		setDescripcion("");
		setImagesSelected([]);
	};
	if (user === null) return <Loading isVisible={true} text={"Cargando..."} />;

	return (
		<>
			<ScrollView>
				<ImageSlider
					setImagesSelected={setImagesSelected}
					imagesSelected={imagesSelected}
				/>
				<FormContainer>
					<FormPublish
						descripcion={descripcion}
						titulo={titulo}
						setTitulo={setTitulo}
						setDescripcion={setDescripcion}
					/>
				</FormContainer>
			</ScrollView>
			<Button
				title="Publicar"
				type={"solid"}
				style={{ marginBottom: 10 }}
				buttonStyle={{ backgroundColor: SECONDARY_COLOR }}
				onPress={handleSubmit}
				disabled={uploading}
			/>
			<Loading isVisible={uploading} text={"publicando"} />
		</>
	);
}
