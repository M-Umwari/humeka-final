import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import Button from '@/components/Button'
import { defaultTimeSlotSchema } from "@/validationSchema/timsSlotSchema";
import moment from 'moment-timezone'
import { createDefaultTimeSlot } from "@/redux/actions/timeSlotActions";
import { resetStatus } from "@/redux/slices/timeSlotSlice";


const NewDefaultTimeSlot = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [showFromPicker, setShowFromPicker] = useState(false)
    const [showToPicker, setShowToPicker] = useState(false)
    const {loading, status} = useAppSelector(state => state.timeSlot)    
    const formik = useFormik({
        initialValues:{
            from: new Date(),
            to: new Date(),
        },
        onSubmit:(formData) => {
            dispatch(createDefaultTimeSlot(formData))
        },
        validationSchema: defaultTimeSlotSchema
    })

    const handleFromDateChange = (event:DateTimePickerEvent, selectedDate: Date | undefined, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
        const currentDate = selectedDate || new Date();
        setShowFromPicker(Platform.OS === 'ios'); // Hide picker on Android
        setFieldValue('from', currentDate, false); // Update Formik state with the selected date
    };

    const handleToDateChange = (event:DateTimePickerEvent, selectedDate: Date | undefined, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
        const currentDate = selectedDate || new Date();
        setShowToPicker(Platform.OS === 'ios'); // Hide picker on Android
        setFieldValue('to', currentDate, false); // Update Formik state with the selected date
    };

    useEffect(() => {
        if(status === 'successful'){
            dispatch(resetStatus())
            router.dismiss()
        }
    },[status])


    return (
        <SafeAreaView className="flex-1 items-center bg-white">
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" className="w-[90%] pb-8">
                <View className="w-full mt-4 items-center">
                    <View className="w-full mb-6">
                        <Text className="mb-1 font-ubuntu">Start Time</Text>
                        {showFromPicker && <DateTimePicker
                            mode="time"
                            display="clock"
                            value={formik.values.from}
                            onChange={(event: DateTimePickerEvent, selectedDate: Date | undefined) => handleFromDateChange(event, selectedDate, formik.setFieldValue)}
                        />}
                        {!showFromPicker && <Pressable onPress={() => setShowFromPicker(true)} className={`flex-row w-full items-center justify-between h-12 px-2 border ${formik.touched.from && formik.errors.from ?'border-red-500':'border-custom-borderGrey'} rounded-md bg-[#f2f2f2]`}>
                            <Feather name="clock" size={20} color="#91969E" />
                            <TextInput 
                                placeholder="Enter start time" 
                                className={`w-[90%] h-full font-ubuntu text-custom-textGrey`}
                                editable={false}
                                value={moment(formik.values.from!).format('hh:mm A')}
                                onBlur={formik.handleBlur('from')}
                            />
                        </Pressable>}
                        {formik.touched.from && formik.errors.from && <Text className="text-red-500 text-xs font-ubuntu mt-2">{formik.errors.from as string}</Text>}
                    </View>
                    <View className="w-full mb-10">
                        <Text className="mb-1 font-ubuntu">End time</Text>
                        {showToPicker && <DateTimePicker
                            mode="time"
                            display="clock"
                            value={formik.values.to!}
                            onChange={(event: DateTimePickerEvent, selectedDate: Date | undefined) => handleToDateChange(event, selectedDate, formik.setFieldValue)}
                        />}
                        {!showToPicker && <Pressable onPress={() => setShowToPicker(true)} className={`flex-row w-full items-center justify-between h-12 px-2 border ${formik.touched.to && formik.errors.to?'border-red-500':'border-custom-borderGrey'} rounded-md bg-[#f2f2f2]`}>
                            <Feather name="clock" size={20} color="#91969E" />
                            <TextInput 
                                placeholder="Enter end time" 
                                className={`w-[90%] h-full font-ubuntu justify-center text-custom-textGrey`}
                                editable={false}
                                value={moment(formik.values.to!).format('hh:mm A')}
                                onBlur={formik.handleBlur('to')}
                            />
                        </Pressable>}
                        {formik.touched.to && formik.errors.to && <Text className="text-red-500 text-xs font-ubuntu mt-2">{formik.errors.to as string}</Text>}
                    </View>
                    <Button text={loading ? 'Submitting...':'Submit'} onPress={() => {formik.handleSubmit()}} styles={`${loading ? 'opacity-80':'opacity-100'}`}/>
                </View>
            </ScrollView>
        </SafeAreaView>    
    );
}
 
export default NewDefaultTimeSlot;