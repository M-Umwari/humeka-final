import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { updateNote } from "@/redux/actions/noteActions";
import { resetUpdateState } from "@/redux/slices/noteSlice";

const JournalEntry = () => {
    const dispatch = useAppDispatch()
    const [mode, setMode] = useState<'view'|'edit'>('view')
    const {entryId} = useLocalSearchParams()
    const {notes, isLoading, updateState} = useAppSelector(state => state.note)
    const note = notes.find(entry => entry.id === entryId)
    const [formData, setFormData] = useState({note: note!.note})

    useEffect(() => {
        if(updateState === 'successful'){
            setMode('view')
            dispatch(resetUpdateState())
        }
    },[updateState])

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" className="w-[90%]">
                {mode === 'view' && note && <Pressable className="w-full my-8" onPress={() => setMode('edit')}>
                    <Text className="text-custom-textGrey font-ubuntuM mb-4 text-lg">{note?.createdAt}</Text>
                    <Text className="text-base font-ubuntu">{note.note}</Text>
                </Pressable>}
                {mode === 'edit' && <View className="w-full my-8">
                    <Text className="text-custom-textGrey font-ubuntuM mb-4 text-lg">{note?.createdAt}</Text>
                    <TextInput
                        className="w-full font-ubuntu text-base"
                        multiline
                        value={formData.note}
                        onChangeText={(text) => setFormData({note: text})}
                        autoFocus={true}
                    />
                </View>}
                {mode === 'edit' && <Button text={isLoading ? 'Saving...':'Save'} onPress={() => formData.note !== "" && dispatch(updateNote({id: entryId as string, formData}))} styles={`mt-8 ${isLoading ? 'opacity-80':'opacity-100'}`}/>}
            </ScrollView>             
        </View>
    );
}
 
export default JournalEntry;