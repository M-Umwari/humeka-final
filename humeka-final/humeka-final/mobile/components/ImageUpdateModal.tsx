import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { forwardRef, useMemo } from "react";
import { Pressable } from "react-native";
import { Text } from "react-native";


interface IProps {
    selectImage: () => void,
    removeImage: () => void,
    handleBackdropPress: () => void
}

const ImageUpdateModal = forwardRef<BottomSheetModal, IProps>(({selectImage, removeImage, handleBackdropPress}, ref) => {
    const snapPoints = useMemo(() => ['25%'], []);
    return (
        <BottomSheetModal 
                ref={ref}
                index={0} 
                snapPoints={snapPoints}
                backdropComponent={() => (
                    <Pressable style={{position: "absolute", width:'100%', height:"100%", backgroundColor:'rgba(0,0,0,0.5)'}} onPress={handleBackdropPress}/>
                )}
            >
                <BottomSheetView className="w-full h-full">
                    <Pressable className="flex-row items-center mt-8 ml-4" onPress={() => selectImage()}>
                        <Feather name="image" size={24} color="black" />
                        <Text className="font-ubuntuM text-sm ml-4">New picture</Text>
                    </Pressable>
                    <Pressable className="flex-row items-center mt-8 ml-4" onPress={() => removeImage()}>
                        <MaterialIcons name="delete-outline" size={24} color="rgb(239, 68, 68)" />
                        <Text className="font-ubuntuM text-sm text-red-500 ml-4">Remove current picture</Text>
                    </Pressable>
                </BottomSheetView>
        </BottomSheetModal>
    )
})

 
export default ImageUpdateModal;