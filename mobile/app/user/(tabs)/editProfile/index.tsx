import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, ScrollView, Image, Pressable, TextInput } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Button from "@/components/Button";
import { editProfile, logout } from "@/redux/actions/userActions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useFormik } from "formik";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useRef, useState, useCallback } from "react";
import { useUploadImage } from "@/utils/imageUpload";
import * as ImagePicker from 'expo-image-picker'
import ImageUpdateModal from "@/components/ImageUpdateModal";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { editProfileSchema } from "@/validationSchema/authSchema";


const Index = () => {
    const dispatch = useAppDispatch()
    const {user, loading} = useAppSelector(state => state.user)
    const bottomSheetModalRef = useRef<BottomSheetModal>(null)
    const defaultProfileImg = process.env.EXPO_PUBLIC_DEFAULT_PROFILE_IMAGE
    const [imageProgress, setImageProgress] = useState<number|null>(null)
    const [imageLoading, setImageLoading] = useState(false)

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleBackdropPress = useCallback(() => {
        bottomSheetModalRef.current?.dismiss();
    }, []);

    const selectImage = async() => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {   
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        handleBackdropPress()
      
        if (!result.canceled) {
            const ImageBlob =  {
                uri: result.assets[0].uri,
                name: result.assets[0].fileName,
                type: "image/jpeg",
            } as any;

            const {url} = await useUploadImage(ImageBlob, setImageProgress, setImageLoading)
            if(url){
                formik.setFieldValue('profileImg', url , true)           
            }
            setImageProgress(null)
        }
    };

    const removeImage = () => {
        formik.setFieldValue('profileImg', defaultProfileImg, true)
        handleBackdropPress()
    }

    const formik = useFormik({
        initialValues:{
            fullName: user?.fullName,
            profileImg: user?.profileImg,
            email: user?.email
        },
        onSubmit: (formData) => {
            console.log(formData)
            dispatch(editProfile({
                email: formData.email as string,
                fullName: formData.fullName as string,
                profileImg: formData.profileImg as string
            }))
        },
        validationSchema: editProfileSchema
    })
    return (
        <BottomSheetModalProvider>
            <ImageUpdateModal selectImage={selectImage} removeImage={removeImage} handleBackdropPress={handleBackdropPress} ref={bottomSheetModalRef}/>
            <View className="flex-1 items-center justify-center bg-white">
                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} className="w-full" contentContainerStyle={{alignItems:'center'}}>
                    <View className="w-[90%]">
                        <View className="w-full mt-12 mb-8 items-center">
                            {!imageLoading  && <View className="relative w-40 h-40 rounded-full mb-8">
                                <View className="self-center rounded-full overflow-hidden w-40 h-40">
                                    <Image source={{ uri: formik.values.profileImg || defaultProfileImg }} className="w-full h-full object-cover"/>
                                </View>
                                <Pressable className="absolute top-28 right-0 items-center justify-center bg-custom-yellow rounded-full w-8 h-8" onPress={handlePresentModalPress}>
                                    <FontAwesome5 name="pen" size={15} color="#ffffff"/>
                                </Pressable>
                            </View>}
                            {imageLoading && imageProgress && <View className="w-full items-center mb-8">
                                <AnimatedCircularProgress
                                    size={70}
                                    width={5}
                                    fill={imageProgress}
                                    tintColor="#EBCC00"
                                    backgroundColor="lightgray"
                                    >
                                    {
                                        () => (
                                        <Text className="text-sm font-ubuntu text-gray-600">
                                            {imageProgress}%
                                        </Text>
                                        )
                                    }
                                </AnimatedCircularProgress>
                            </View>}
                            <View className="w-full mb-4">
                                <Text className="mb-2 font-ubuntu">Email</Text>
                                <TextInput 
                                    placeholder="Enter your email" 
                                    className={`w-full h-12 px-2 border ${formik.touched.email && formik.errors.email?'border-red-500':'border-custom-borderGrey'} rounded-md font-ubuntu bg-[#f2f2f2]`}
                                    onChangeText={formik.handleChange('email')}
                                    onBlur={formik.handleBlur('email')}
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email && <Text className="text-red-500 text-xs font-ubuntu mt-2">{formik.errors.email}</Text>}
                            </View>
                            <View className="w-full mb-4">
                                <Text className="mb-2 font-ubuntu">Full Name</Text>
                                <TextInput 
                                    placeholder="Enter your name" 
                                    className={`w-full h-12 px-2 border ${formik.touched.fullName && formik.errors.fullName?'border-red-500':'border-custom-borderGrey'} rounded-md font-ubuntu bg-[#f2f2f2]`}
                                    onChangeText={formik.handleChange('fullName')}
                                    onBlur={formik.handleBlur('fullName')}
                                    value={formik.values.fullName}
                                />
                                {formik.touched.fullName && formik.errors.fullName && <Text className="text-red-500 text-xs font-ubuntu mt-2">{formik.errors.fullName}</Text>}
                            </View>
                        </View>
                        <View className="w-full mb-4 items-center">
                            <Button text={`${loading?'Saving...':'Save'}`} onPress={() => formik.handleSubmit()} styles={`mb-4 ${loading? 'opacity-80':'opacity-100'}`}/>
                            <Link push href='/user/editProfile/changePassword' asChild>
                                <Text className="text-custom-yellow font-ubuntuB text-base">Change password</Text>
                            </Link>
                        </View>
                    </View>
                    <View className="w-full bg-white items-center pt-4 pb-12 border-t-[5px] border-[#f2f2f2] mt-8">
                        <Pressable onPress={() => dispatch(logout())} className="w-[90%] flex-row items-center">
                            <MaterialIcons name="logout" size={20} color="#EBCC00" />
                            <Text className="font-ubuntuM text-custom-yellow text-lg ml-2">L.o.g.o.u.t</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </BottomSheetModalProvider>    
    );
}
 
export default Index;