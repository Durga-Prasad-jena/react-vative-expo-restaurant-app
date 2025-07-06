import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dinetimelogo from "../assets/images/dinetimelogo.png";
import Frame from "../assets/images/Frame.png";
export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView className="bg-[#2b2b2b]">
      <StatusBar barStyle="light-content" backgroundColor="#2b2b2b" />
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-2 flex-1 jutify-center items-center">
          <Image
            source={dinetimelogo}
            style={{ height: 300, width: 300 }}
            resizeMode="contain"
          />
          <View className="w-3/4">
            <TouchableOpacity
              onPress={() => router.push("/signup")}
              className="p-2 my-2 bg-[#f49b33] text-black rounded-lg  "
            >
              <Text className="text-base font-semibold text-center">
                Sign Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/home")}
              className="p-2 my-2 bg-[#2b2b2b] border border-[#f49b33]  text-white rounded-lg max-w-fit  "
            >
              <Text className="text-base text-[#f49b33] font-semibold text-center">
                Guest User
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text className="text-center font-semibold text-base text-white my-4">
              <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24 " />
              or
              <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24 " />
            </Text>
            <TouchableOpacity 
            onPress={()=>router.push("/signin")}
            className="flex flex-row items-center">
              <Text className="font-semibold text-white ">
                Already have a user?
              </Text>
              <Text className="text-base font-semibold underline text-[#f49b33]">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1 mt-80">
          <Image  source={Frame} resizeMode="contain" className="h-full w-full"/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
