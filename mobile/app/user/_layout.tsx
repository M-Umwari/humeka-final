import { useAppSelector } from "@/redux/hooks";
import { Redirect, Stack } from "expo-router";

export default function Layout() {
  const {token} = useAppSelector(state => state.user)
  console.log(token)
  if(!token){
      return <Redirect href='/auth/login'/>
  }
    
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)"/>
      <Stack.Screen name="questionnaire"/>
    </Stack>
  );
}