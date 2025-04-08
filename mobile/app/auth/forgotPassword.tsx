import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import Button from "@/components/Button";
import { createGroup } from "@/redux/actions/groupActions";
import { useRouter } from "expo-router";
import { resetCreateStatus } from "@/redux/slices/groupSlice";
import { requestCode } from "@/redux/actions/userActions";
import { useFormik } from "formik";
import { forgotPasswordSchema } from "@/validationSchema/authSchema";
import { resetRequestStatus, resetStatus } from "@/redux/slices/userSlice";


const ForgotPassword = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {requestStatus, requesting} = useAppSelector(state => state.user)

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: (values) => {
            dispatch(requestCode(values))
        },
        validationSchema: forgotPasswordSchema
    })

    useEffect(() => {
        if(requestStatus === 'successful'){
            router.push({pathname:'/auth/verifyCode', params:{email:formik.values.email}})
            dispatch(resetRequestStatus())
        }
    }, [requestStatus])

    
    return (
        <View className="flex-1 items-center bg-white">
            <View className="w-[90%] items-start pt-6 mt-4">
                <View className="w-full mb-4">
                    <Text className="mb-8 font-ubuntu text-xl text-center">Enter the email associated with your account.</Text>
                    <TextInput 
                        placeholder="Enter your email" 
                        className={`w-full h-12 px-2 border border-custom-borderGrey rounded-md font-ubuntu bg-[#f2f2f2]`}
                        onChangeText={formik.handleChange('email')}
                        onBlur={formik.handleBlur('email')}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && <Text className="text-red-500 text-xs font-ubuntu mt-2">{formik.errors.email}</Text>}
                    <Button text={requesting ? 'Submitting...':'Submit'} onPress={() => {formik.handleSubmit()}} styles={`${requesting ? 'opacity-80':'opacity-100'} mt-8`}/>
                </View>
            </View>
        </View>
    );
}
 
export default ForgotPassword;