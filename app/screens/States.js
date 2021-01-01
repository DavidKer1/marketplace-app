import React from "react";
import { useNavigation } from '@react-navigation/native';

import { View, FlatList } from "react-native";
import State from "../components/State";
import estados from "../utils/municipios";
 function States() {
	const navigation = useNavigation()
	return (
		<View>
			<FlatList
				data={estados}
				renderItem={({item}) => <State item={item} navigation={navigation} />}
				keyExtractor={(item) => item.estado}
			/>
		</View>
	);
}


export default States


