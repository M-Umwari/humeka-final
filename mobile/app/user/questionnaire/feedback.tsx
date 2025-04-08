import { SafeAreaView } from "react-native-safe-area-context";
import {Text, View, Image} from 'react-native'
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { joinGroup } from "@/redux/actions/groupActions";
import { useEffect } from "react";
import { resetStatus } from "@/redux/slices/groupSlice";


const Feedback = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {recommendedGroup} = useAppSelector(state => state.user)
    const {loading, status} = useAppSelector(state => state.group)

    useEffect(() => {
        if(status === 'successful'){
            dispatch(resetStatus())
            router.replace({pathname: `/user/chat/${recommendedGroup!.id}`, params:{groupName: `#${recommendedGroup!.name}`}})
        }
    },[status])

    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-white">
            <View className="w-[90%] items-center">
                <View className="w-[90%] h-32">
                    <Image source={require('../../../assets/images/feedback.png')} className="w-full h-full object-cover"/>
                </View>
                <Text className="text-2xl font-ubuntuB text-center mt-8">Thank you for taking the questionnaire</Text>
                <Text className="text-base font-ubuntu text-center mt-8">Based on your results, we recommend you to join the <Text className="text-custom-yellow font-ubuntuB">{recommendedGroup!.name}</Text> Support group</Text>
                <Button text={loading?"Joining...":"Join Support Group"} onPress={() => dispatch(joinGroup(recommendedGroup!.id))} styles={`mt-8 ${loading?"opacity-80":"opacity-100"}`}/>
            </View>
        </SafeAreaView>
    );
}
 
export default Feedback;