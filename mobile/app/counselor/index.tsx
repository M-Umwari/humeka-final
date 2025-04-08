import { useAppSelector } from "@/redux/hooks";
import { router, useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";


const Index = () => {
     const router = useRouter()
        const {user} = useAppSelector(state => state.user)
    return (
        <SafeAreaView className="flex-1 items-center bg-white">
            <ScrollView showsVerticalScrollIndicator={false} className="w-[90%]">
                <View className="w-full">
                    <View className="w-full mt-8 bg-[#FEF9E7] p-4 rounded-xl">
                        <Text className="text-3xl font-ubuntuB">Hi, <Text className="text-custom-yellow">{user && user!.fullName.split(" ")[0]}</Text> 👋</Text>
                        <Text className="font-ubuntuB text-2xl mt-4">What would you like to do today?</Text>
                    </View>
                    <View className="w-full mt-12 border border-gray-100 rounded-xl p-4"
                        style={{
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 2,
                            elevation: 2,
                            backgroundColor: 'white'
                        }}>
                        <Text className="text-lg font-ubuntuM">Join a support group</Text>
                        <Text className="text-custom-textGrey font-ubuntu mt-2 text-base">Provide support to users with mental health disorders</Text>
                        <Button text='View support groups' onPress={() => router.push('/counselor/chat')} styles="mt-6 w-[55%] h-10" textStyles="text-sm"/>
                    </View>
                    <View className="w-full mt-12 border border-gray-100 rounded-xl p-4"
                        style={{
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 2,
                            elevation: 2,
                            backgroundColor: 'white'
                        }}>
                        <Text className="text-lg font-ubuntuM">Manage your calendar</Text>
                        <Text className="text-custom-textGrey font-ubuntu mt-2 text-base">
                            Set your availability by creating time slots for sessions and easily manage your schedule to provide 
                            timely support to users.
                        </Text>
                        <Button text='Go to calendar' onPress={() => router.push('/counselor/calendar')} styles="mt-6 w-[50%] h-10" textStyles="text-sm"/>
                    </View>
                    <View className="w-full mt-12 mb-8 border border-gray-100 rounded-xl p-4"
                        style={{
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 2,
                            elevation: 2,
                            backgroundColor: 'white'
                        }}>
                        <Text className="text-lg font-ubuntuM">Write a journal entry</Text>
                        <Text className="text-custom-textGrey font-ubuntu mt-2 text-base">Use the journaling feature to take notes about your sessions, track progress, and 
                        reflect on key discussions with users</Text>
                        <Button text='Go to journal' onPress={() => router.push('/counselor/journal')} styles="mt-6 w-[50%] h-10" textStyles="text-sm"/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
 
export default Index;