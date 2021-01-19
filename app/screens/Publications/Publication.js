import React, { useState } from "react";
import { View, Text, Dimensions,ScrollView } from "react-native";
import { Card } from "react-native-elements";
import {  } from "react-native-gesture-handler";
import { Pagination } from "react-native-snap-carousel";
import Carousel from "../../components/Publications/Carousel";
import Description from "../../components/Publications/Description";
import { PRIMARY_COLOR } from "../../utils/constants";

export default function Publication({
	route: {
		params: { data, localDate},
	},
}) {

  const [activeSlide, setActiveSlide] = useState(0);
  const width = Dimensions.get("window").width
	return (
		<ScrollView>
			<Carousel
				images={data.images}
				width={width}
				height={250}
        setActiveSlide={setActiveSlide}
        
			/>
			<Pagination
				dotsLength={data.images.length}
        activeDotIndex={activeSlide}
        inactiveDotOpacity={1}
        dotStyle={{
          backgroundColor: PRIMARY_COLOR,
        }}
        containerStyle={{
          paddingTop: 10,
          backgroundColor: '#fff',
          paddingBottom: 0
        }}
			/>
      <Description data={data} localDate={localDate}/>

     

		</ScrollView>
	);
}
