import { useRouter } from "expo-router";
import { Formik } from "formik";
import {
  Image,

  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dinetimelogo from "../../assets/images/dinetimelogo.png";
import { authSchema } from "../../utils/authSchema";
const Signup = () => {
  const router = useRouter();
  const handleSignUp = () => {};
  return (
    <SafeAreaView className="bg-[#2b2b2b]">
      <StatusBar barStyle="light-content" backgroundColor="#2b2b2b" />
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-2 flex-1 jutify-center items-center">
          <Image
            source={dinetimelogo}
            style={{ height: 200, width: 200 }}
            resizeMode="contain"
          />

          <Text className="text-large text-white text-center font-bold  ">
            Lets get started
          </Text>
          <View className="w-5/6 ">
            <Formik
              initialValues={{ email: "", password: "" }}
                validationSchema={authSchema}
              onSubmit={handleSignUp}
            >
              {({
                handleChange,
                handleSubmit,
                handleBlur,
                errors,
                values,
                touched,
              }) => (
                <View className="w-full ">
                  <Text className="text-[#f49b33] mt-4 mb-2">Email*</Text>
                  <TextInput
                    className="h-12 border border-white rounded-lg px-2"
                    onChangeText={handleChange("email")}
                    placeholder="Enter Your Email"
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholderTextColor="gray"
                  />
                  {touched.email && errors.email && (
                    <Text className="text-red-500 text-xs mb-2">
                      {errors.email}
                    </Text>
                  )}
                  <Text className="text-[#f49b33] mt-4 mb-2">Password*</Text>
                  <TextInput
                    className="h-12 border border-white rounded-lg px-2"
                    onChangeText={handleChange("password")}
                    placeholder="Enter Your Password"
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={true}
                    placeholderTextColor="gray"
                  />
                  {touched.password && errors.password && (
                    <Text className="text-red-500 text-xs mb-2">
                      {errors.password}
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={handleSubmit}
                    className="p-2 my-2 bg-[#f49b33] text-black rounded-lg  mt-10 "
                  >
                    <Text className="text-base font-semibold text-center">
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

            <View>
              <TouchableOpacity 
              onPress={()=>router.push("/signin")}
              className="flex flex-row justify-center items-center mt-2">
                <Text className="text-white font-semibold text-base ">Already have a user?</Text>
                <Text className="text-base text-[#f49b33] font-medium">Sign in</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
        {/* <View className="flex-1">
          <Image
            source={Frame}
            resizeMode="contain"
            className="h-full w-full"
          />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
