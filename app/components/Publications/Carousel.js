import React from "react";
import { View, Text } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Image } from "react-native-elements";
export default function CarouselComponent({ images, height, width, setActiveSlide }) {

	const renderItem = ({ item }) => {
		return <Image style={{ width, height }} source={{ uri: item }} />;
	};
	return (
		<Carousel
			layout={"stack"}
			data={images}
      sliderWidth={width}
			itemWidth={width}
      renderItem={renderItem}
			onSnapToItem={(index) => setActiveSlide(index)}
		/>
	);
}
