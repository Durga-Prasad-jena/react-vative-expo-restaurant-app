import { router } from "expo-router";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dinetimelogo from "../../../assets/images/dinetimelogo.png";
import homeBanner from "../../../assets/images/homeBanner.png";
import { db } from "../../../config/firebaseConfig";

const Home = () => {
  const [restaurantData, setREstaurantData] = useState([]);
  const getRestaurants = async () => {
    try {
      const q = query(collection(db, "restaurants"));
      const res = await getDocs(q);

      res.forEach((item) => {
        setREstaurantData((prev) => [...prev, item.data()]);
      });
    } catch (error) {
      console.log("error as when fetch restaurants data", error);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => router.push(`/restaurant/${item.name}`)}
        className="bg-[#5f5f5f] max-h-64 max-w-xs flex justify-center rounded-lg p-4 mx-4 shadow-md"
      >
        <Image
          source={{ uri: item.image }}
          className="h-28 mt-3 mb-1 rounded-lg"
        />
        <Text className="text-white text-lg font-bold mb-1">{item.name}</Text>
        <Text className="text-white text-base font-normal mb-1">
          {item.address}
        </Text>
        <Text className="text-base text-white mb-2">
          open: {item.opening} & close: {item.closing}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView className="bg-[#2b2b2b] h-full">
      <View className="flex items-center ">
        <View className="bg-[#3b3b3b] w-11/12 rounded-xl justify-between items-center flex flex-row p-2 m-3">
          <View className="flex flex-row">
            <Text className="text-base h-10  pt-[10] align-middle text-white">
              Welcome to{" "}
            </Text>
            <Image source={dinetimelogo} className="h-12 w-20" />
          </View>
          <View>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/3388/3388020.png",
              }}
              resizeMode="contain"
              className="h-10 w-10"
            />
          </View>
        </View>
      </View>
      <ScrollView>
        <Image source={homeBanner} resizeMode="cover" className="w-full h-64" />
        <View className="p-4 bg-[#2b2b2b]   justify-center items-center">
          <Text className="text-white text-2xl mr-2 font-semibold">
            Special Discount %
          </Text>
        </View>
     <View className="max-h-72 bg-[#2b2b2b] justify-center items-center">
         {restaurantData.length > 0 ? (
          <FlatList
            data={restaurantData}
            renderItem={renderItem}
            horizontal
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ padding: 16 }}
          />
        ) : (
          <ActivityIndicator size={20} animating color={"#fb9b33"} />
        )}
     </View>
        <View className="p-4 bg-[#2b2b2b]   justify-center items-center">
          <Text className="text-white text-2xl mr-2 font-semibold">
            Our Restaurants
          </Text>
        </View>
         <View className="max-h-72 bg-[#2b2b2b] justify-center items-center">
         {restaurantData.length > 0 ? (
          <FlatList
            data={restaurantData}
            renderItem={renderItem}
            horizontal
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ padding: 16 }}
          />
        ) : (
          <ActivityIndicator size={20} animating color={"#fb9b33"} />
        )}
     </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
