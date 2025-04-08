import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="form" options={{ 
        headerShown: true, title: 'Questionnaire', 
        headerTitleStyle:{fontFamily: 'Ubuntu-Medium'}
      }}/>
      <Stack.Screen name="feedback" />
    </Stack>
  );
}