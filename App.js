import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// screens
import Loading from "./screens/Loading";
import Home from "./screens/Home";
import Search from "./screens/Search";
import Add from "./screens/Add";
import ChatRoom from "./screens/ChatRoom";
import Store from "./screens/Store";
import Chat from "./screens/Chat";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Info from "./screens/Info";
import Detail from "./screens/Detail";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Store" component={Store} />
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
