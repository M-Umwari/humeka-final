import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: true, headerTitleStyle:{fontFamily: 'Ubuntu-Medium'} }}>
      <Stack.Screen name="index" options={{title: 'My Journal'}}/>
      <Stack.Screen name="[entryId]" options={{title: 'Entry'}}/>
      <Stack.Screen name="createEntry" options={{title:'New Entry'}}/>
    </Stack>
  );
}