import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { Formik } from "formik";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dinetimelogo from "../../assets/images/dinetimelogo.png";
import { authSchema } from "../../utils/authSchema";
const Signup = () => {
  const [loading,setLoading]=useState(false)
  const db = getFirestore();
  const auth = getAuth();
  const router = useRouter();
  const handleSignUp = async (values) => {
    try {
      setLoading(true)
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: values.email,
        createdAt: new Date(),
      });
      await AsyncStorage.setItem("userEmail", values.email);
      setLoading(false)
      router.push("/home");
    } catch (error) {
      setLoading(false)
      if (error.code === "auth/email-already-in-use") {
        Alert.alert(
          "Signup Failed!",
          "This email address are already use..please use different email address",
          [{ text: "OK" }]
        );
      } else {
        Alert.alert(
          "Signup error",
          "an unexpected error ..please signup later",
          [
            {
              text: "OK",
            },
          ]
        );
      }
    }
  };
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
                    style={{ color: "white" }}
                  />
                  {touched.email && errors.email && (
                    <Text className="text-red-500 text-lg mb-2">
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
                    style={{ color: "white" }}
                  />
                  {touched.password && errors.password && (
                    <Text className="text-red-500 text-lg mb-2">
                      {errors.password}
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={handleSubmit}
                    className="p-2 my-2 bg-[#f49b33] text-black rounded-lg  mt-10 "
                  >
                    <Text className="text-base font-semibold text-center">
                      {loading ? "Register..." : "Register"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

            <View>
              <TouchableOpacity
                onPress={() => router.push("/signin")}
                className="flex flex-row justify-center items-center mt-2"
              >
                <Text className="text-white font-semibold text-base ">
                  Already have a user?
                </Text>
                <Text className="text-base text-[#f49b33] font-medium">
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
