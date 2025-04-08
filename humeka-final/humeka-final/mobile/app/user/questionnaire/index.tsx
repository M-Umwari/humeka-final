import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Image, Pressable } from "react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

const Index = () => {
    const router = useRouter()
    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-white">
            <View className="w-[85%] items-center">
                <Text className="font-ubuntuB text-2xl text-center">Welcome to the humeka family</Text>
                <View className="w-full h-40 mt-16 rounded-lg overflow-hidden">
                    <Image source={require('../../../assets/images/homepage.jpg')} className="w-full h-full object-cover"/>
                </View>
                <Text className="font-ubuntu text-base text-center mt-4">Answer a few questions to help us support you better.</Text>
                <Button text='Start Questionnaire' onPress={() => router.push('/user/questionnaire/form')} styles="mt-16"/>
            </View>
           
        </SafeAreaView>
    );
}
 
export default Index;