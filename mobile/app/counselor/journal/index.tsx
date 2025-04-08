import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, ScrollView, Text, View, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Entypo, Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteNote, getNotes } from "@/redux/actions/noteActions";
import { BasicSkeletonGroup } from "@/components/skeletons/BasicSkeleton";
import { resetStatus } from "@/redux/slices/noteSlice";

const screenHeight = Dimensions.get('screen').height

const Index = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {notes, fetching, isLoading, status} = useAppSelector(state => state.note)
    const [showModal, setShowModal] = useState({state:false, id:''})

    useEffect(() => {
        dispatch(getNotes())
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
                        <Text className="font-ubuntuM text-lg">Delete entry?</Text>
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
                            onPress={() => dispatch(deleteNote(showModal.id))}
                            >
                            <Text className="font-ubuntu text-base text-red-500">
                                {isLoading ? 'Deleting...':'Delete'}
                            </Text>
                        </Pressable>
                    </View>            
                </View>
            </View>}

            <Pressable className="items-center justify-center absolute z-10 w-12 h-12 bottom-10 right-6 rounded-full bg-custom-yellow" onPress={() => router.push('/counselor/journal/createEntry')}>
                <Entypo name="plus" size={30} color="white" />
            </Pressable>
            <ScrollView showsVerticalScrollIndicator={false} className="w-[90%]">
                <View className="w-full my-8">
                    {!fetching && notes.map((note) => (
                        <Pressable className="p-4 border border-custom-borderGrey w-full rounded-xl mb-4"
                            onPress={() => router.push(`/counselor/journal/${note.id}`)}
                            onLongPress={() => setShowModal({state:true, id:note.id})}
                            key={note.id}
                            >
                            <Text className="text-base font-ubuntu">
                                {note.note.slice(0,151)} {note.note.length > 150 && <Text className="font-ubuntuM ml-2 text-custom-yellow">...see more</Text>}
                            </Text>
                            <View className="flex-row items-center justify-between mt-4">
                                <Text className="text-custom-textGrey font-ubuntu">{note.createdAt}</Text>
                                <Feather name="chevron-right" size={18} color="#CCCCCC" />
                            </View>  
                        </Pressable>
                    ))}
                    {fetching && <BasicSkeletonGroup number={5}/>}
                    {!fetching && notes.length === 0 && <Text className="text-custom-textGrey font-ubuntuM text-base text-center mt-8">You do not have any journal entries. Click on the plus icon to create a new entry.</Text>}
                </View>
            </ScrollView>
        </View>
    );
}
 
export default Index;