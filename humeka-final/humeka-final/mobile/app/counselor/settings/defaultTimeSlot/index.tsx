import { DefaultTimeSlotSkeletonGroup } from "@/components/skeletons/DefaultTimeSlotSkeleton";
import { deleteDefaultTimeSlot, getDefaultTimeSlots } from "@/redux/actions/timeSlotActions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetStatus } from "@/redux/slices/timeSlotSlice";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";


const Index = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {defaultTimeSlots, fetching, loading, status} = useAppSelector(state => state.timeSlot)
    const [showModal, setShowModal] = useState({state:false, id:''})

    useEffect(() => {
        dispatch(getDefaultTimeSlots())
    },[])

    useEffect(() => {
        if(status === 'successful'){
            setShowModal({state:false, id:''})
            dispatch(resetStatus())
        }
    },[status])

    return (
        <View className="flex-1 items-center bg-white">
            {showModal.state && <View className="z-10 absolute top-0 left-0 right-0 bottom-0 items-center justify-center w-full h-full" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <View className="rounded-lg bg-white w-[85%] items-center">
                    <View className="border-b border-custom-borderGrey w-[90%] items-center py-2">
                        <Text className="font-ubuntuM text-lg">Delete default timeslot?</Text>
                    </View>
                    <View className="w-[90%] py-2">
                        <Text className="text-custom-textGrey font-ubuntu text-base">This action can not be reversed</Text>
                    </View>
                    <View className="w-[90%] flex-row justify-between mt-3">
                        <Pressable className="w-1/2 items-center py-3 border-r border-t border-custom-borderGrey" onPress={() => setShowModal({state:false, id:''})}>
                            <Text className="font-ubuntu text-base">Abort</Text>
                        </Pressable>
                        <Pressable 
                            className="w-1/2 items-center py-3 border-t border-custom-borderGrey" 
                            onPress={() => dispatch(deleteDefaultTimeSlot(showModal.id))}
                            >
                            <Text className="font-ubuntu text-base text-red-500">
                                {loading ? 'Deleting...':'Delete'}
                            </Text>
                        </Pressable>
                    </View>            
                </View>
            </View>}

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" className='w-full'>
                <View className="w-full bg-white items-center">
                    <View className="w-[90%] py-8">
                        {!fetching && defaultTimeSlots.length === 0 && <Text className="mb-8 text-custom-textGrey font-ubuntuM text-base">You do not have any default time slots</Text>}
                        {defaultTimeSlots.length !== 0 && <Text className="mb-8 text-custom-textGrey font-ubuntuM text-base">These time slots will be automatically created by the system everyday.</Text>}
                        {!fetching && defaultTimeSlots.map((slot) => (
                            <Pressable 
                                className="w-full justify-center rounded-md bg-[#f2f2f2] p-4 mb-4 border-l-[5px] border-custom-yellow" 
                                onPress={() => router.push(`/counselor/settings/defaultTimeSlot/${slot.id}`)}
                                onLongPress={() => setShowModal({state:true, id:slot.id})}
                                key={slot.id}
                            >
                                <Text className="font-ubuntuM text-base">{slot.from} to {slot.to}</Text>
                            </Pressable>
                        ))}    
                        {fetching && <DefaultTimeSlotSkeletonGroup number={3}/>}                   
                    </View>
                    <View className="w-full border-t-[5px] border-[#f2f2f2] items-center pt-4">
                        <Text className="font-ubuntuM text-lg w-[90%] mb-4">Additional options</Text>
                        <Pressable className="w-[90%] flex-row items-center justify-between py-2" onPress={() => router.push('/counselor/settings/defaultTimeSlot/createDefaultTimeSlot')}>
                            <Text className="font-ubuntu text-base">Add default time slot</Text>
                            <AntDesign name="right" size={18} color="#91969E" />
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
 
export default Index;