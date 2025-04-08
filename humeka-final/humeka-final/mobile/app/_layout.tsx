import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from '@/hooks/useColorScheme';
import store from '@/redux/store';
import { Provider } from 'react-redux';
import Toast, { BaseToastProps, BaseToast, ErrorToast } from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo';
import { errorToast, successToast } from '@/utils/toast';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const isAppInitialized = useRef(false);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Ubuntu-Light': require('../assets/fonts/Ubuntu-Light.ttf'),
    'Ubuntu-Regular': require('../assets/fonts/Ubuntu-Regular.ttf'),
    'Ubuntu-Medium': require('../assets/fonts/Ubuntu-Medium.ttf'),
    'Ubuntu-Bold': require('../assets/fonts/Ubuntu-Bold.ttf'),
  });

  const toastConfig = {

    success: (props:BaseToastProps) => (
      <BaseToast
        {...props}
        text1NumberOfLines={0}
        style={{
          borderLeftWidth: 0
        }}
        contentContainerStyle={{
          backgroundColor: '#22C55E',
          borderRadius: 5
        }}
        text1Style={{
          fontSize: 15,
          fontWeight: 600,
          fontFamily: 'Ubuntu-Medium',
          color: 'white'
        }}
      />
    ),
    error: (props:BaseToastProps) => (
        <ErrorToast
          {...props}
          text1NumberOfLines={0}
          style={{
            borderLeftWidth: 0
          }}
          contentContainerStyle={{
            backgroundColor: '#EF4444',
            borderRadius: 5
          }}
          text1Style={{
            fontSize: 15,
            fontWeight: 600,
            fontFamily: 'Ubuntu-Medium',
            color: 'white'
          }}
        />
    ),
  }

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if(!state.isConnected){
        errorToast('You are currently offline. Some features may not work')
      }else{
        if(!isAppInitialized.current){
          isAppInitialized.current = true
        }else{
          successToast('You are back online')
        }   
      }
    });
    
    return () => unsubscribe();
  },[])

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex:1}}>
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name="auth" />
        </Stack>  
        <Toast config={toastConfig}/>
      </GestureHandlerRootView>
    </Provider>  
    
  );
}
