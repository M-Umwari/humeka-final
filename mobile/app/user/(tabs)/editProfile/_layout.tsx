import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: true, headerTitleStyle:{fontFamily: 'Ubuntu-Medium'} }}>
      <Stack.Screen name="index" options={{title:'Edit Profile'}}/>
      <Stack.Screen name="changePassword" options={{title:'Change Password'}}/>
    </Stack>
  );
}