import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Loading from "./screens/Loading";
import Home from "./screens/Home";
import Search from "./screens/Search";
import Add from "./screens/Add";
import ChatRoom from "./screens/ChatRoom";
import Store from "./screens/Store";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
        <Stack.Screen name="Store" component={Store} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
