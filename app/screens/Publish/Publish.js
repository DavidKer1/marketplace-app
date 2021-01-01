import React, { useContext, useState } from "react";
import { ScrollView } from "react-native";
import FormContainer from "../../components/FormContainer";
import FormPublish from "../../components/Publish/FormPublish";
import ImageSlider from "../../components/Publish/ImageSlider";
import { FirebaseContext } from "../../context/firebase/FirebaseContext";

export default function Publish(props) {
	const { user } = useContext(FirebaseContext);
	const { route, navigation } = props;
	const [city, setCity] = useState("");
	React.useEffect(() => {
		if (route.params?.municipio) {
			setCity(route.params?.municipio);
		}
	}, [route.params]);

	if (user === null) return <Loading isVisible={true} text={"Cargando..."} />;

	return (
		<ScrollView>
			<ImageSlider />
			<FormContainer>
				<FormPublish city={city} />
			</FormContainer>
		</ScrollView>
	);
}
