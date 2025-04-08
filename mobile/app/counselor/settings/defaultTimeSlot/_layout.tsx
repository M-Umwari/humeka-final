import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: true, headerTitleStyle:{fontFamily: 'Ubuntu-Medium'} }}>
      <Stack.Screen name="index" options={{title:'Default timeslots'}}/>
      <Stack.Screen name="createDefaultTimeSlot" options={{title:'Add default timeslot'}}/>
      <Stack.Screen name="[timeSlotId]" options={{title:'Edit default timeslot'}}/>
    </Stack>
  );
}