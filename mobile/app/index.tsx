import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetInitializeStatus } from "@/redux/slices/userSlice";
import { Redirect, router } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen'
import { initializeAuth } from "@/redux/actions/userActions";


const Home = () => {
    const dispatch = useAppDispatch()
    const {token, user, initializeStatus} = useAppSelector(state => state.user)

    useEffect(() => {
        (async() => {
            await SplashScreen.preventAutoHideAsync()
            console.log('initializing auth...')
            dispatch(initializeAuth())
        })()
    },[])
    
    useEffect(() => {
        (async() => {
            if (initializeStatus === 'complete') {
                await SplashScreen.hideAsync()
                if(token && user){
                    if(user.role === 'user'){
                        if(user.hasTakenQuestionnaire){
                            router.replace('/user')
                        }else{
                            router.replace('/user/questionnaire')
                        }
                    }   
                     
                    user.role === 'counselor' && router.replace('/counselor')
                }else{
                    router.replace('/auth')
                }
                
                dispatch(resetInitializeStatus())
            }
        })()
    },[initializeStatus])
    
    return null
}
 
export default Home;