import Button from "@/components/Button";
import { changePassword, logout, resetPassword } from "@/redux/actions/userActions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetChangePasswordStatus, resetResetStatus, resetStatus } from "@/redux/slices/userSlice";
import { resetPasswordSchema } from "@/validationSchema/authSchema";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const ResetPassword = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {resetting, resetStatus} = useAppSelector(state => state.user)
    const [hidePassword, setHidePassword] = useState(true)
    const {email} = useLocalSearchParams()
    
    const formik = useFormik({
        initialValues:{
            email: email as string,
            newPassword:'',
            confirmPassword:''
        },
        onSubmit: (formData) => {
            dispatch(resetPassword({
                email: email as string,
                newPassword: formData.newPassword
            }))
        },
        validationSchema: resetPasswordSchema
    })

    useEffect(() => {
        if(resetStatus === 'successful'){
            router.push('/auth/login')
            dispatch(resetResetStatus())
        }
    },[resetStatus])
    
    return (
        <SafeAreaView className="flex-1 items-center bg-white">
            <View className="w-[90%]">
                <View className="w-full my-8">
                    <View className="w-full mb-6">
                        <Text className="mb-2 font-ubuntu">New Password</Text>
                        <View className={`flex items-center flex-row justify-between border ${formik.touched.newPassword && formik.errors.newPassword?'border-red-500':'border-custom-borderGrey'} rounded-md bg-[#f2f2f2] px-2`}>
                            <TextInput 
                                placeholder="Enter your new password" 
                                className={`w-[90%] h-12 font-ubuntu`}
                                onChangeText={formik.handleChange('newPassword')}
                                onBlur={formik.handleBlur('newPassword')}
                                value={formik.values.newPassword}
                                secureTextEntry={hidePassword}
                            />
                            <Pressable onPress={() => setHidePassword(prev => !prev)}>
                                <Feather name={hidePassword ? "eye":"eye-off"} size={20} color="#64748B"/>
                            </Pressable>
                        </View>
                        {formik.touched.newPassword && formik.errors.newPassword && <Text className="text-red-500 text-xs font-ubuntu mt-2">{formik.errors.newPassword}</Text>}
                    </View>
                    <View className="w-full">
                        <Text className="mb-2 font-ubuntu">Confirm Password</Text>
                        <View className={`flex items-center flex-row justify-between border ${formik.touched.confirmPassword && formik.errors.confirmPassword?'border-red-500':'border-custom-borderGrey'} rounded-md bg-[#f2f2f2] px-2`}>
                            <TextInput 
                                placeholder="Enter your new password" 
                                className={`w-[90%] h-12 font-ubuntu`}
                                onChangeText={formik.handleChange('confirmPassword')}
                                onBlur={formik.handleBlur('confirmPassword')}
                                value={formik.values.confirmPassword}
                                secureTextEntry={hidePassword}
                            />
                            <Pressable onPress={() => setHidePassword(prev => !prev)}>
                                <Feather name={hidePassword ? "eye":"eye-off"} size={20} color="#64748B"/>
                            </Pressable>
                        </View>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && <Text className="text-red-500 text-xs font-ubuntu mt-2">{formik.errors.confirmPassword}</Text>}
                    </View>
                </View>
                <Button text={`${resetting?'Submitting...':'Submit'}`} onPress={() => formik.handleSubmit()} styles={`${resetting?'opacity-80':'opacity-100'}`}/>
            </View>
        </SafeAreaView>
    );
}
 
export default ResetPassword;