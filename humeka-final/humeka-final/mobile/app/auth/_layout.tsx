import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="forgotPassword" options={{headerShown: true, title:'Forgot Password', headerTitleStyle:{fontFamily: 'Ubuntu-Medium'} }}/>
      <Stack.Screen name="resetPassword" options={{headerShown: true, title:'Reset Password', headerTitleStyle:{fontFamily: 'Ubuntu-Medium'} }}/>
      <Stack.Screen name="verifyCode" options={{headerShown: true, title:'Verify Code', headerTitleStyle:{fontFamily: 'Ubuntu-Medium'} }}/>
    </Stack>
  );
}