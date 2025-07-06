import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView>
      <Drawer initialRouteName="(tabs)" screenOptions={{headerShown:false}} >
        <Drawer.Screen name="(tabs)" options={{title:"Home"}}/>
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
