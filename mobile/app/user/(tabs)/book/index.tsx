import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View, Image, Pressable } from "react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { getAllCounselors } from "@/redux/actions/userActions";

const Index = () => {
    const router = useRouter()
    const {counselors} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllCounselors())
    },[])
    
    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar style="dark" />
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 30 }}
            >
                <View className="w-[90%]">
                    <View className="w-full mt-4 mb-6">
                        <Text className="font-ubuntu text-base text-custom-textGrey">
                            Schedule one-on-one time with our qualified mental health professionals
                        </Text>
                    </View>
                    
                    <View className="w-full">
                        {counselors.map(counselor => (
                            <Pressable 
                                key={counselor.id}
                                onPress={() => router.push(`/user/book/${counselor.id}`)}
                                className="w-full mb-6"
                            >
                                <View className="w-full bg-white rounded-xl overflow-hidden border border-gray-100" style={{
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 2,
                                    elevation: 2
                                }}>
                                    <View className="h-16 bg-[#FEF9E7]" />
                                    
                                    <View className="w-full items-center px-6 pb-6 -mt-8">
                                        <View className="rounded-full overflow-hidden w-24 h-24 border-4 border-white">
                                            <Image 
                                                source={{ uri: counselor.profileImg}} 
                                                className="w-full h-full object-cover"
                                            />
                                        </View>
                                        
                                        <Text className="font-ubuntuB text-lg mt-3">{counselor.fullName}</Text>
                                        <Text className="font-ubuntu text-custom-textGrey text-center mt-1">{counselor?.email}</Text>
                                        
                                        <View className="flex-row mt-3 mb-4">
                                            <View className="bg-[#F8F8F8] rounded-full px-3 py-1 mx-1">
                                                <Text className="font-ubuntu text-xs text-custom-textGrey">Mental Health</Text>
                                            </View>
                                            <View className="bg-[#F8F8F8] rounded-full px-3 py-1 mx-1">
                                                <Text className="font-ubuntu text-xs text-custom-textGrey">Counselor</Text>
                                            </View>
                                        </View>
                                        
                                        <Button 
                                            text="Book Session" 
                                            onPress={() => router.push(`/user/book/${counselor.id}`)} 
                                            styles="w-full h-12"
                                        />
                                    </View>
                                </View>
                            </Pressable>
                        ))}
                        
                        {counselors.length === 0 && (
                            <View className="w-full items-center justify-center py-12">
                                <Text className="font-ubuntu text-custom-textGrey text-base">No counselors available at the moment</Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>    
    );
}
 
export default Index;