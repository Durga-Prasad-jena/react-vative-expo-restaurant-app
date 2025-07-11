import { useLocalSearchParams } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import FindSlot from "../../components/FindSlot";
import GuestPickerUserComponent from "../../components/GuestPickerUserComponent";
import DateTimePickerComponent from "../../components/restaurant/DateTimePickerComponent";
import { db } from "../../config/firebaseConfig";
const Restaurant = () => {
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [restaurantDataItem, setRestaurantDataItem] = useState({});
  const [imageCarousel, setImageCarousel] = useState([]);
  const [slots, setSlots] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [date, setDate] = useState(new Date());
  const [selectedSlot,setSelectedSlot]=useState(null)

  const { restaurant } = useLocalSearchParams();
  const flatListRef = useRef(null);
  const windowWidth = Dimensions.get("window").width;
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

        const carouselQuery = query(
          collection(db, "carousel"),
          where("res_id", "==", doc.ref)
        );

        const carouselSnapShot = await getDocs(carouselQuery);
        if (carouselSnapShot.empty) {
          ToastAndroid.show("No Carousel  data found ", ToastAndroid.SHORT);
        }
        const carouselImages = [];
        carouselSnapShot.forEach((carouselItem) => {
          carouselImages.push(carouselItem.data());
        });
        setImageCarousel(carouselImages);

        const slotQuery = query(
          collection(db, "slot"),
          where("ref_id", "==", doc.ref)
        );

        const slotSnapShot = await getDocs(slotQuery);
        if (slotSnapShot.empty) {
          ToastAndroid.show("No slot  data found ", ToastAndroid.SHORT);
        }
        const slotsSnap = [];
        slotSnapShot.forEach((slotItem) => {
          slotsSnap.push(slotItem.data());
        });
        setSlots(slotsSnap);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRestaurantsData();
  }, []);


  useEffect(() => {
     const carouselLength = imageCarousel[0]?.images.length;
     
  }, []);

  const handleNextImage = () => {
    const carouselLength = imageCarousel[0]?.images.length;
    if (currentIndex < carouselLength - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }
    if (currentIndex == carouselLength - 1) {
      const nextIndex = 0;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }
  };

  const handlePreviousImage = () => {
    const carouselLength = imageCarousel[0]?.images.length;
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      flatListRef.current.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    }
    if (currentIndex == 0) {
      const prevIndex = carouselLength - 1;
      setCurrentIndex(prevIndex);
      flatListRef.current.scrollToIndex({ index: prevIndex, animated: true });
    }
  };

  const handleLocationClick = async () => {
    try {
      const url = "https://maps.app.goo.gl/J6gV8uipS6XLhTfa6";
      const supportURL = await Linking.canOpenURL(url);
      if (supportURL) {
        Linking.openURL(url);
      } else {
        ToastAndroid.show("No location found", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const renderCarousel = ({ item }) => {
    return (
      <View style={{ width: windowWidth - 2 }} className="h-64 relative">
        <View
          style={{
            position: "absolute",
            padding: 5,
            backgroundColor: "rgba(0,0,0,0.6)",
            top: "50%",
            right: "6%",
            zIndex: 10,
            borderRadius: "50%",
          }}
        >
          <Ionicons
            onPress={handleNextImage}
            name="arrow-forward"
            size={24}
            color="white"
          />
        </View>
        <View
          style={{
            position: "absolute",
            padding: 5,
            backgroundColor: "rgba(0,0,0,0.6)",
            top: "50%",
            left: "2%",
            zIndex: 10,
            borderRadius: "50%",
          }}
        >
          <Ionicons
            onPress={handlePreviousImage}
            name="arrow-back"
            size={24}
            color="white"
          />
        </View>
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            bottom: 10,
            zIndex: 10,
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            transform: [{ translateX: -50 }],
            left: "50%",
          }}
        >
          {imageCarousel[0].images.map((item, index) => {
            return (
              <View
                key={index}
                className={`h-2 w-2 bg-[white] mx-1 p-1 rounded-full ${index == currentIndex && "h-3 w-8"}`}
              ></View>
            );
          })}
        </View>
        <Image
          source={{ uri: item }}
          style={{
            opacity: 0.5,
            backgroundColor: "black",
            marginRight: 20,
            marginLeft: 5,
            borderRadius: 25,
          }}
          className="h-64"
        />
      </View>
    );
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
        <View className="h-64 max-w-[98%] mx-2 rounded-[25px]">
          <FlatList
            ref={flatListRef}
            data={imageCarousel[0]?.images}
            renderItem={renderCarousel}
            horizontal
            scrollEnabled={true}
            style={{ borderRadius: 25 }}
          />
        </View>
        <View className="flex-1 items-center flex-row p-2 gap-1">
          <Ionicons
            onPress={handlePreviousImage}
            name="location-sharp"
            size={24}
            color="#f49b33"
          />
          <Text className="text-[white]  max-w-[75%]">
            {restaurantDataItem.address} | {"  "}
            <Text
              onPress={handleLocationClick}
              className="text-[#f49b33] italic underline font-semibold"
            >
              Get Location
            </Text>
          </Text>
        </View>
        <View className="flex-1 items-center p-2 ml-1 flex-row gap-1">
          <Ionicons name="time" color="#f49b33" size={22} />
          <Text className="text-[#f49b33] font-semibold">
            {restaurantDataItem?.opening} - {restaurantDataItem?.closing}
          </Text>
        </View>
        <View className="border border-[#f49b33] mx-4 py-2">
          <View className="flex-1 flex-row justify-between items-center px-2 ml-2 ">
            <View className="flex-1 flex-row gap-2 items-center">
              <Ionicons name="calendar" size={22} color="#f49b33" />
              <Text className="text-[white] font-light">Select a Date</Text>
            </View>
            <DateTimePickerComponent date={date} setDate={setDate} />
          </View>
          <View className="flex-1 flex-row bg-[#474747] justify-between items-center rounded-lg m-2 p-2  mt-4">
            <View className="flex-1 flex-row gap-2 items-center">
              <Ionicons name="people" size={22} color="#f49b33" />
              <Text className="text-[white] font-light">
                Select number of Guest
              </Text>
            </View>
            <View>
              <GuestPickerUserComponent
                selectedNumber={selectedNumber}
                setSelectedNumber={setSelectedNumber}
              />
            </View>
          </View>
        </View>
        <View className="flex-1">
           <FindSlot
           slots={slots}
           selectedSlot={selectedSlot}
           setSelectedSlot={setSelectedSlot}
           
           />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Restaurant;
