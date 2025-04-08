import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: true, headerTitleStyle:{fontFamily: 'Ubuntu-Medium'} }}>
      <Stack.Screen name="index" options={{title:'Book Session'}}/>
      <Stack.Screen name="[counselorId]" options={{title:'Book Session'}} />
    </Stack>
  );
}