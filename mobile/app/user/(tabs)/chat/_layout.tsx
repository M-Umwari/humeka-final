import { Stack, useGlobalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addMessage } from "@/redux/slices/messageSlice";
import { Message } from "@/types/Message";
import io from "socket.io-client";


const socketEndpoint = process.env.EXPO_PUBLIC_URL;

export default function Layout() {
    const {groupId, groupName} = useGlobalSearchParams()
    const {groups} = useAppSelector(state => state.group)
    const dispatch = useAppDispatch()
    const {user, token} = useAppSelector(state => state.user)


    useEffect(() => {
        const socket = io(socketEndpoint, {
            transports: ["websocket"],
        })

        for(const group of groups){
            const userInGrp = group.users.find(theUser => theUser.id === user?.id)
            if(!userInGrp){
                continue
            }

            socket.on(`chat-room-${group.id}-new-message`, (data:Message) => {
                if(data.sender.id !== user?.id){
                    if(groupId === data.group.id){
                        dispatch(addMessage(data))
                    }
                }
            });  
        }

        return () => {
            socket.disconnect();
            socket.removeAllListeners();
        }
    },[groupId])
    
    return (
        <Stack screenOptions={{ headerShown: true, headerTitleStyle:{fontFamily: 'Ubuntu-Medium'} }}>
            <Stack.Screen name="index" options={{title:'Support Groups'}}/>
            <Stack.Screen name="[groupId]" options={{title:groupName as string}}/>
        </Stack>
    );
}