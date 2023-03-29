import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Loading from "./screens/Loading";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Loading" component={Loading} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
