import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { Colors } from "../../../assets/Colors";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: "gray",
        tabBarActiveBackgroundColor:"#332F2F",
        tabBarStyle: {
          backgroundColor: Colors.SECONDARY,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "800",
        },
      }}
      initialRouteName="home"
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="home"
              color={color}
              size={20}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="time"
              color={color}
              size={20}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="person-sharp"
              color={color}
              size={20}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
