import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, FlatList, StyleSheet} from "react-native";
import { ListItem } from "react-native-elements";
import { CategoryContext } from "../../context/CategoryContext";
import { FirebaseContext } from "../../context/firebase/FirebaseContext";

export default function Categories() {
	const { categories } = useContext(FirebaseContext);
	console.log(categories);
	return (
		<View>
			<FlatList
				data={categories}
				renderItem={({ item }) => <Category item={item} />}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
}

function Category({item}) {
  const {setCategory} = useContext(CategoryContext)
  const navigation = useNavigation()
  const handleSelect = () => {
    setCategory(item);
    navigation.navigate("Publish")
  }
	return (
		<ListItem
			containerStyle={styles.divider}
			onPress={handleSelect }
		>
			<ListItem.Content>
				<ListItem.Title>{item.category}</ListItem.Title>
			</ListItem.Content>
			<ListItem.Chevron type="font-awesome" name="chevron-right" />
		</ListItem>
	);
}

const styles = StyleSheet.create({
	
	divider: {
		borderBottomWidth: 1,
    borderColor: "#dbdbdb",
    backgroundColor: "#fff",
		paddingHorizontal: 14,
		paddingVertical: 20,
	},
});
