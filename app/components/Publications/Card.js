import React from "react";
import { format, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import dayjs from "dayjs";
import "dayjs/locale/es";
import {
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
} from "react-native";
import { ALTERNATIVE_SECONDARY_COLOR, ALTERNATIVE_SECONDARY_COLOR_DARK, SECONDARY_COLOR } from "../../utils/constants";

import { Card } from "react-native-elements";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);
export default function CardComponent({ data, navigation }) {
	const { createdAt, images, location, title, price } = data;

	const localDate = format(createdAt.toMillis(), "dd MMMM yyyy hh:mm", {
		locale: es,
	});
	const formatToNow = formatDistanceToNow(createdAt.toDate(), { locale: es });

	const monthDiff = dayjs(createdAt.toDate()).diff(new Date(), "month");

	return (
		<TouchableWithoutFeedback
			onPress={() => navigation.navigate("Publication", { data, localDate})}
		>
			<Card>
				{images.length > 0 ? (
					<Card.Image source={{ uri: images[0] }} />
				) : (
					<NoImage />
				)}
				<Card.Divider />

				<Text style={[styles.title, styles.text]}>
					{title?.slice(0, 50)}
				</Text>
				<Text style={[styles.lightText, styles.text]}>
					{location?.municipio}, {location?.estado}
				</Text>

				<Text style={[styles.price, styles.text]}>$ {price || 0}</Text>
				{monthDiff < 0 ? (
					<Text
						style={[
							styles.date,
							styles.text,
							styles.lightText,
							{ textTransform: "capitalize" },
						]}
					>
						{localDate}
					</Text>
				) : (
					<Text style={[styles.date, styles.text, styles.lightText]}>
						Hace {formatToNow}
					</Text>
				)}
			</Card>
		</TouchableWithoutFeedback>
	);
}

const NoImage = () => (
	<Card.Image style={styles.imagen}>
		<Text style={{ color: "#fff" }}>No hay fotografías para mostrar.</Text>
	</Card.Image>
);

const styles = StyleSheet.create({
	imagen: {
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		marginVertical: 2,
	},
	title: {
		fontSize: 20,
		fontWeight: '300',
		color: ALTERNATIVE_SECONDARY_COLOR_DARK,
	},
	lightText: {
		color: "#838383",
		fontSize: 12,
	},
	date: {
		marginTop: 30,
	},
	price: {
		fontWeight: 'bold',
		color: SECONDARY_COLOR,
		fontSize: 16,
	},
});
