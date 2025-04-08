import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { createNote, updateNote } from "@/redux/actions/noteActions";
import { resetCreateState } from "@/redux/slices/noteSlice";

const JournalEntry = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {entryId} = useLocalSearchParams()
    const {notes, isLoading, createState} = useAppSelector(state => state.note)
    
    const [formData, setFormData] = useState({note: ""})

    useEffect(() => {
        if(createState === 'successful'){
            router.dismiss()
            router.push(`/counselor/journal/${notes[0].id}`)
            dispatch(resetCreateState())
        }
    },[createState])

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" className="w-[90%]">
                <View className="w-full my-8">
                    <TextInput
                        className="w-full font-ubuntu text-base"
                        multiline
                        value={formData.note}
                        onChangeText={(text) => setFormData({note: text})}
                        autoFocus={true}
                    />
                </View>
                <Button text={isLoading ? 'Saving...':'Save'} onPress={() => formData.note !== "" && dispatch(createNote(formData))} styles={`mt-8 ${isLoading ? 'opacity-80':'opacity-100'}`}/>
            </ScrollView>             
        </View>
    );
}
 
export default JournalEntry;