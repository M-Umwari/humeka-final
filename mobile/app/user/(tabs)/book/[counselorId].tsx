import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View, Image, Pressable, TextInput, Platform } from "react-native";
import Button from "@/components/Button";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import ModalSelector from 'react-native-modal-selector';
import { AntDesign } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getActiveDates, getTimeSlotsByDate } from "@/redux/actions/timeSlotActions";
import { useFormik } from "formik";
import { createAppointment } from "@/redux/actions/appointmentActions";
import moment from 'moment-timezone'


const Counselor = () => {
    const router = useRouter()
    const [date, setDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false)
    const {counselorId} = useLocalSearchParams()
    const {counselors} = useAppSelector(state => state.user)
    const {timeSlots, fetching, loading} = useAppSelector(state => state.timeSlot)
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<{id:string, label:string} | null>(null)
    const dispatch = useAppDispatch()

    const counselor = counselors.find(counselor => counselor.id === counselorId)

    useEffect(() => {
        counselor && dispatch(getTimeSlotsByDate({counselorId: counselor.id, date: moment(date).format('YYYY MM DD')}))
    },[date])

    const options = timeSlots.map((slot, i) => {
        return {key: i, label: `${slot.from} to ${slot.to}`, value: slot.id}
    })

    const handleDateChange = (event:DateTimePickerEvent, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || new Date();
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate)
    };

    const handleCreateAppointment = () => {
        console.log(selectedTimeSlot)
        selectedTimeSlot && dispatch(createAppointment({timeSlotId: selectedTimeSlot.id}))
    }


    return (
        <View className="flex-1 items-center justify-center bg-white">
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" className="w-[90%]">
                <View className="w-full mt-8 mb-12">
                    <View className="w-full bg-white rounded-xl overflow-hidden border border-gray-100" style={{
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 2,
                            elevation: 5
                        }}>
                        <View className="h-16 bg-[#FEF9E7]" />
                        
                        <View className="w-full items-center px-6 pb-6 -mt-8">
                            <View className="rounded-full overflow-hidden w-24 h-24 border-4 border-white">
                                <Image 
                                    source={{ uri: counselor?.profileImg}} 
                                    className="w-full h-full object-cover"
                                />
                            </View>
                            
                            <Text className="font-ubuntuB text-lg mt-3">{counselor?.fullName}</Text>
                            <Text className="font-ubuntu text-custom-textGrey text-center mt-1">{counselor?.email}</Text>
                            
                            <View className="flex-row mt-3 mb-4">
                                <View className="bg-[#F8F8F8] rounded-full px-3 py-1 mx-1">
                                    <Text className="font-ubuntu text-xs text-custom-textGrey">Mental Health</Text>
                                </View>
                                <View className="bg-[#F8F8F8] rounded-full px-3 py-1 mx-1">
                                    <Text className="font-ubuntu text-xs text-custom-textGrey">Counselor</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="w-full mt-12">
                        <Text className="font-ubuntuM text-lg mt-4">Book a time slot</Text>
                        <View className="w-full mt-8">
                            <Text className="mb-2 font-ubuntu">Date</Text>
                            {showPicker && <DateTimePicker
                                mode="date"
                                display="spinner"
                                value={date}
                                onChange={(event: DateTimePickerEvent, selectedDate: Date | undefined) => handleDateChange(event, selectedDate)}
                            />}
                            {!showPicker && <Pressable onPress={() => setShowPicker(true)} className={`flex-row w-full items-center justify-between h-12 px-2 border ${'border-custom-borderGrey'} rounded-md bg-[#f2f2f2]`}>
                                <MaterialIcons name="calendar-month" size={20} color="#91969E" />
                                <TextInput 
                                    placeholder="Select date" 
                                    className={`w-[90%] h-full font-ubuntu`}
                                    editable={false}
                                    value={moment(date).format('YYYY MM DD')}
                                />
                            </Pressable>}
                        </View>
                        {fetching && <Text className="font-ubuntu text-custom-textGrey text-sm mt-6">fetching time slots...</Text>}
                        {!fetching && timeSlots.length === 0 && <Text className="font-ubuntu text-red-500 text-sm mt-6">No available time slots. Choose a different date</Text>}
                        {!fetching && timeSlots.length !== 0 && <View className="w-full mt-4">
                            <Text className="mb-2 font-ubuntu">Time</Text>
                            <ModalSelector
                                data={options}
                                onChange={(option) => {
                                    console.log(option)
                                    setSelectedTimeSlot({id: option.value, label: option.label})
                                }}
                                selectTextStyle={{
                                    fontFamily: 'Ubuntu-Regular',
                                    color:'black'
                                }}
                                optionTextStyle={{
                                    fontFamily: 'Ubuntu-Regular',
                                    color:'black'
                                }}
                                optionContainerStyle={{
                                    backgroundColor: 'white',
                                }}
                                cancelContainerStyle={{
                                    backgroundColor: 'white',
                                    borderRadius: 6
                                }}
                                cancelTextStyle={{
                                    fontFamily: 'Ubuntu-Regular',
                                }}
                                cancelText="Cancel"
                            >
                                <View className={`w-full items-center flex-row justify-between px-2 h-12 rounded-md border ${'border-custom-borderGrey'} bg-[#f2f2f2]`}>
                                    <View className="flex-row items-center">
                                        <MaterialIcons name="access-time" size={20} color="#91969E" />
                                        <Text className={`font-ubuntu ml-2 text-custom-grey`}>
                                            {selectedTimeSlot ? selectedTimeSlot.label : 'Select time slot'}
                                        </Text>
                                    </View> 
                                    <AntDesign name="down" size={17} color="grey" />
                                </View>
                            </ModalSelector>
                        </View>}
                        <Button text={loading ? "Submitting..." : "Submit"} onPress={handleCreateAppointment} styles={`mt-8 ${loading ? 'opacity-80':'opacity-100'}`}/>
                        <Pressable className="flex-row items-center mt-4 self-center" onPress={() => router.replace('/user/book')}>
                            <AntDesign name="arrowleft" size={20} color="#ebcc00"/>
                            <Text className="text-custom-yellow font-ubuntuM ml-2 text-base">Back to all counselors</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>    
    );
}
 
export default Counselor;