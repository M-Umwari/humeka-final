import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: true, headerTitleStyle:{fontFamily: 'Ubuntu-Medium'} }}>
      <Stack.Screen name="index" options={{title:'Settings'}}/>
      <Stack.Screen name="changePassword" options={{title:'Change Password'}}/>
      <Stack.Screen name="defaultTimeSlot" options={{headerShown: false}}/>
      <Stack.Screen name="createTimeSlot" options={{title:'Add Timeslot'}}/>
    </Stack>
  );
}