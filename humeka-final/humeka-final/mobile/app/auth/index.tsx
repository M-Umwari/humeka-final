import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Image, Pressable } from "react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

const Home = () => {
    const router = useRouter()
    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-white">
            <View className="w-[90%] items-center">
                <Image source={require('../../assets/images/logo.png')} className="w-40 h-40"/>
                <Text className="font-ubuntu text-base text-center">Your journey to mental well-being starts here.</Text>
            </View>
            <View className="w-[90%] h-44 mt-12 rounded-lg overflow-hidden">
                <Image source={require('../../assets/images/homepage.jpg')} className="w-full h-full object-cover"/>
            </View>
            <View className="w-[90%] items-center mt-12">
                <Button text='Get Started' onPress={() => router.push('/auth/signup')}/>
                <Button text='Login' onPress={() => router.push('/auth/login')} styles="mt-8"/>
            </View>
        </SafeAreaView>
    );
}
 
export default Home;