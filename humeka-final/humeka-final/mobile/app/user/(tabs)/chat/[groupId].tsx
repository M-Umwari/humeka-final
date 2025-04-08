import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getMessages, sendMessage } from "@/redux/actions/messageActions";
import uuid from 'react-native-uuid';
import moment from "moment-timezone";
import { addMessageToTempStorage, clearMessages } from "@/redux/slices/messageSlice";


const SupportGroup = () => {
    const scrollViewRef = useRef<ScrollView>(null);
    const {groupId} = useLocalSearchParams()
    const {groups} = useAppSelector(state => state.group)
    const group = groups.find(group => group.id === groupId)
    const dispatch = useAppDispatch()
    const {messages} = useAppSelector(state => state.message)
    const {user} = useAppSelector(state => state.user)
    const [newMessage, setNewMessage] = useState("")

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd();
    },[messages])

    useEffect(() => {
        groupId && dispatch(getMessages(groupId as string))

        return () => {
            dispatch(clearMessages())
        }
    },[])

    const handleSend = () => {
        if(!newMessage.trim()){
            return
        }

        dispatch(addMessageToTempStorage({
            id: uuid.v4(),
            content: newMessage,
            sender: user!,
            createdAt: moment().format("MMM D, [at] h:mm A")
        }))

        group && dispatch(sendMessage({
            groupId: group.id,
            content: newMessage
        }))

        setNewMessage("")
    }
    
    return (
        <View className="flex-1 items-center bg-[#f2f2f2]">
            <View className="w-full flex-1">
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{alignItems:'center'}} ref={scrollViewRef}>
                    <View className="w-[90%] items-start pb-8 pt-2">
                        {/* <View className="max-w-[70%] self-end mt-8">
                            <Text className="text-custom-textGrey mb-1 font-ubuntu">10:38 am</Text>
                            <View className="p-3 bg-custom-yellow rounded-xl">
                                <Text className="text-white font-ubuntu">Good morning. Happy to join this support group. I am depressed and lonely</Text>
                            </View>
                        </View> */}
                        {messages.map(message => (
                            <View className={`max-w-[70%] ${message.sender.id === user?.id ? 'self-end':'self-start'} mt-6`} key={message.id}>
                                <View className="flex-row items-center mb-1">
                                    {message.sender.id !== user?.id && <Text className="text-custom-textGrey font-ubuntuB mr-4">{message.sender.fullName.split(" ")[0]}</Text>}
                                    <Text className="text-custom-textGrey font-ubuntu">{message.createdAt}</Text>
                                </View>
                                <View className={`p-3 rounded-xl ${message.sender.id === user?.id ? 'bg-white self-end rounded-tr-none':'bg-custom-yellow self-start rounded-tl-none'}`}>
                                    <Text className={`${message.sender.id === user?.id ? 'text-black':'text-white'} font-ubuntu`}>{message.content}</Text>
                                </View>
                            </View>
                        ))}
                        {/* <View className="max-w-[70%] self-start mt-6">
                            <View className="flex-row items-center mb-1">
                                <Text className="text-custom-textGrey font-ubuntuB mr-4">Jacob</Text>
                                <Text className="text-custom-textGrey font-ubuntu">10:38 am</Text>
                            </View>
                            <View className="p-3 bg-white rounded-xl">
                                <Text className="font-ubuntu">Based on your results, we recommend you to join the Depression Support group</Text>
                            </View>
                        </View>
                        <View className="max-w-[70%] self-end mt-4">
                            <Text className="text-custom-textGrey mb-1 font-ubuntu">10:38 am</Text>
                            <View className="p-3 bg-custom-yellow rounded-xl">
                                <Text className="text-white font-ubuntu">Good morning</Text>
                            </View>
                        </View>
                        <View className="max-w-[70%] self-end mt-4 mb-8">
                            <Text className="text-custom-textGrey mb-1 font-ubuntu">10:38 am</Text>
                            <View className="p-3 bg-custom-yellow rounded-xl">
                                <Text className="text-white font-ubuntu">This questionnaire will help us understand your emotional and mental well-being to connect you with the most suitable support group. What does this mean?</Text>
                            </View>
                        </View>

                        <View className="max-w-[70%] self-end mt-4 mb-8">
                            <Text className="text-custom-textGrey mb-1 font-ubuntu">10:38 am</Text>
                            <View className="p-3 bg-custom-yellow rounded-xl">
                                <Text className="text-white font-ubuntu">This questionnaire will help us understand your emotional and mental well-being to connect you with the most suitable support group. What does this mean?</Text>
                            </View>
                        </View>
                        <View className="max-w-[70%] self-end mt-4 mb-8">
                            <Text className="text-custom-textGrey mb-1 font-ubuntu">10:38 am</Text>
                            <View className="p-3 bg-custom-yellow rounded-xl">
                                <Text className="text-white font-ubuntu">This questionnaire will help us understand your emotional and mental well-being to connect you with the most suitable support group. What does this mean?</Text>
                            </View>
                        </View>
                        <View className="max-w-[70%] self-end mt-4 mb-8">
                            <Text className="text-custom-textGrey mb-1 font-ubuntu">10:38 am</Text>
                            <View className="p-3 bg-custom-yellow rounded-xl">
                                <Text className="text-white font-ubuntu">This questionnaire will help us understand your emotional and mental well-being to connect you with the most suitable support group. What does this mean?</Text>
                            </View>
                        </View>
                        <View className="max-w-[70%] self-end mt-4 mb-8">
                            <Text className="text-custom-textGrey mb-1 font-ubuntu">10:38 am</Text>
                            <View className="p-3 bg-custom-yellow rounded-xl">
                                <Text className="text-white font-ubuntu">This questionnaire will help us understand your emotional and mental well-being to connect you with the most suitable support group. What does this mean?</Text>
                            </View>
                        </View>
                        <View className="max-w-[70%] self-end mt-4 mb-8">
                            <Text className="text-custom-textGrey mb-1 font-ubuntu">10:38 am</Text>
                            <View className="p-3 bg-custom-yellow rounded-xl">
                                <Text className="text-white font-ubuntu">This questionnaire will help us understand your emotional and mental well-being to connect you with the most suitable support group. What does this mean?</Text>
                            </View>
                        </View> */}
                    </View>
                </ScrollView>
            </View>
            <View className="w-full bg-white h-16 items-center justify-center">
                <View className="w-[90%] flex-row items-center justify-between">
                    <TextInput
                        placeholder="Type a message..."
                        className="w-[75%] h-10 font-ubuntu"
                        onChangeText={(value) => setNewMessage(value)}
                        value={newMessage}
                    />
                    <Pressable className="rounded-md bg-custom-yellow p-2 w-[15%] items-center justify-center" onPress={handleSend}>
                        <Feather name="send" size={20} color="white" />
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
 
export default SupportGroup;