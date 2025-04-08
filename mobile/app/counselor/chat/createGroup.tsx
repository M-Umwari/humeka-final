import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import Button from "@/components/Button";
import { createGroup } from "@/redux/actions/groupActions";
import { useRouter } from "expo-router";
import { resetCreateStatus } from "@/redux/slices/groupSlice";


const CreateGroup = () => {
    const router = useRouter()
    const [name, setName] = useState("")
    const {loading, createStatus} = useAppSelector(state => state.group)
    const dispatch = useAppDispatch()

    const handleSubmit = () => {
        if(!name){
            return
        }

        dispatch(createGroup({name}))
    }

    useEffect(() => {
        if(createStatus === 'successful'){
            dispatch(resetCreateStatus())
            router.dismiss()
        }
    },[createStatus])

    return (
        <View className="flex-1 items-center bg-white">
            <View className="w-[90%] items-start pt-6 mt-8">
                <View className="w-full mb-4">
                    <Text className="mb-2 font-ubuntu">Group Name</Text>
                    <TextInput 
                        placeholder="Enter group name" 
                        className={`w-full h-12 px-2 border border-custom-borderGrey rounded-md font-ubuntu bg-[#f2f2f2]`}
                        onChangeText={(value:string) => setName(value)}
                        value={name}
                    />
                    <Button text={loading ? 'Submitting...':'Submit'} onPress={handleSubmit} styles={`${loading ? 'opacity-80':'opacity-100'} mt-8`}/>
                </View>
            </View>
        </View>
    );
}
 
export default CreateGroup;