import { useLocalSearchParams } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { Platform, ScrollView, Text, ToastAndroid, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../config/firebaseConfig";
const Restaurant = () => {
  const [restaurantDataItem, setRestaurantDataItem] = useState({});
  console.log("restaurantDataItem", restaurantDataItem);
  const [imageCarousel, setImageCarousel] = useState([]);
  const [slots, setSlots] = useState({});
  const { restaurant } = useLocalSearchParams();

  const getRestaurantsData = async () => {
    try {
      const restaurantDataItemQuery = query(
        collection(db, "restaurants"),
        where("name", "==", restaurant)
      );
      const restaurantSnapSort = await getDocs(restaurantDataItemQuery);
      if (restaurantSnapSort.empty) {
        ToastAndroid.show(
          "No data restaurant found by use of name",
          ToastAndroid.SHORT
        );
      }

      for (const doc of restaurantSnapSort.docs) {
        const restaurantData = doc.data();
        setRestaurantDataItem(restaurantData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#2b2b2b",
        paddingBottom:
          Platform.OS === "ios" ? 20 : Platform.OS === "android" ? 55 : null,
      }}
    >
      <ScrollView className="h-full">
        <View className="flex-1 my-2 p-2">
          <Text className="text-xl text-[#f49b33] font-semibold ">
            {restaurant}
          </Text>
          <View className="border-b-2 border-[#f49b33]" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Restaurant;
