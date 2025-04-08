import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import Button from "@/components/Button";
import { useLocalSearchParams, useRouter } from "expo-router";
import { resetVerifyStatus } from "@/redux/slices/userSlice";
import { useFormik } from "formik";
import { verifyCodeSchema } from "@/validationSchema/authSchema";
import { requestCode, verifyCode } from "@/redux/actions/userActions";


const VerifyCode = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {verifyStatus, loading, requesting} = useAppSelector(state => state.user)
    const {email} = useLocalSearchParams()

    const formik = useFormik({
        initialValues: {
            code: '',
            email: email as string
        },
        onSubmit: async(formData) => {
            dispatch(verifyCode(formData))
        },
        validationSchema: verifyCodeSchema
    })

    useEffect(() => {
        if(verifyStatus === 'successful'){
            router.push({pathname:'/auth/resetPassword', params:{email:email as string}})
            dispatch(resetVerifyStatus())
        }
    }, [verifyStatus])  

    return (
        <View className="flex-1 items-center bg-white">
            <View className="w-[90%] items-start pt-6 mt-4">
                <View className="w-full mb-4">
                    <Text className="mb-8 font-ubuntu text-xl">Enter the six digit code that was sent to your email</Text>
                    <TextInput 
                        placeholder="Enter six digit code" 
                        className={`w-full h-12 px-2 border ${formik.touched.code && formik.errors.code ? 'border-red-500':'border-custom-borderGrey'}  rounded-md font-ubuntu bg-[#f2f2f2]`}
                        onChangeText={formik.handleChange('code')}
                        onBlur={formik.handleBlur('code')}
                        value={formik.values.code}
                    />
                    {formik.touched.code && formik.errors.code && <Text className="text-red-500 text-xs font-ubuntu mt-2">{formik.errors.code}</Text>}
                    <Button text={loading ? 'Submitting...':'Submit'} onPress={() => formik.handleSubmit()} styles={`${loading ? 'opacity-80':'opacity-100'} mt-8`}/>
                    <Pressable onPress={() => dispatch(requestCode({email: email as string}))}>
                        <Text className="self-center font-ubuntuM text-base text-custom-yellow mt-4">{requesting?'Requesting...':'Resend code'}</Text>
                    </Pressable>      
                </View>
            </View>
        </View>
    );
}
 
export default VerifyCode;