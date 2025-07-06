import { useRouter } from "expo-router";
import { Formik } from "formik";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dinetimelogo from "../../assets/images/dinetimelogo.png";
import { authSchema } from "../../utils/authSchema";

const Signin = () => {
     const router = useRouter()
  return (
    <SafeAreaView className="bg-[#2b2b2b]">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-2  flex justify-center items-center">
          <Image
            source={dinetimelogo}
            style={{ height: 200, width: 200 }}
            resizeMode="cover"
          />
          <Text className="text-white font-semibold ">Lets get started</Text>
          <View className="w-5/6">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={authSchema}
            >
              {({
                handleBlur,
                handleChange,
                handleSubmit,
                errors,
                values,
                touched,
              }) => (
                <View>
                  <Text className="test-base text-[#f49b33] mb-2 mt-4 ">
                    Email*
                  </Text>
                  <TextInput
                    placeholder="Enter Your Email"
                    className="h-12 border border-white rounded-lg"
                    onChangeText={handleChange("email")}
                    value={values.email}
                    onBlur={handleBlur("email")}
                    placeholderTextColor="gray"
                  />
                  {touched.email && errors.email && (
                    <Text className=" text-red-500">{errors.email}</Text>
                  )}
                  <Text className="test-base text-[#f49b33] mb-2 mt-4 ">
                    Password*
                  </Text>
                  <TextInput
                    placeholder="Enter Your Password"
                    className="h-12 border border-white rounded-lg"
                    onChangeText={handleChange("password")}
                    value={values.password}
                    onBlur={handleBlur("password")}
                    placeholderTextColor="gray"
                  />
                  {touched.password && errors.password && (
                    <Text className=" text-red-500">{errors.password}</Text>
                  )}
                  <TouchableOpacity className="p-2 bg-[#f49b33] rounded-lg mt-10 justify-center items-center">
                    <Text className="text-[#2b2b2b]">Sign in</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                  onPress={()=>router.push("/signup")}
                  className="flex flex-row justify-center items-center mt-3">
                    <Text className="text-white font-bold ">
                      Dont have an account?
                    </Text>
                    <Text className="text-[#f49b33]"> Sign up</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
