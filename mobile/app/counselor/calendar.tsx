import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text, Pressable } from "react-native";
import {
  CalendarProvider,
  ExpandableCalendar,
  TimelineList
} from "react-native-calendars";
import moment from 'moment-timezone'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createTimeSlot, deleteTimeSlot, getAllTimeSlots } from "@/redux/actions/timeSlotActions";
import { Event } from 'react-native-calendars/src/timeline/EventBlock';
import { cancelAppointment } from "@/redux/actions/appointmentActions";
import { addTimeSlot, resetStatus } from "@/redux/slices/timeSlotSlice";
import uuid from 'react-native-uuid';


const screenWidth = Dimensions.get("window").width;

const CalendarComponent = () => {
    const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"))
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.user)
    const {timeSlots, status, loading} = useAppSelector(state => state.timeSlot)
    const [showModal, setShowModal] = useState({state:false, id:'', name:'', mode:''})
    const [formattedSlots, setFormattedSlots] = useState<{[key:string]: Event[]}>({})
    const [markedDates, setMarkedDates] = useState<{[key:string]: any}>({})
    const [shouldUpdate, setShouldUpdate] = useState(uuid.v4())

    useEffect(() => {
        dispatch(getAllTimeSlots(user!.id))
    },[])

    useEffect(() => {
        if(status === 'successful'){
            setShowModal({state:false, id:'', name:'', mode:''})
            dispatch(resetStatus())
        }
    },[status])

    useEffect(() => {
        const newFormattedSlots: {[key:string]: Event[]} = {};
        const newMarkedDates: { [key: string]: any } = {};

        for (const slot of timeSlots) {
            if (slot.date in newFormattedSlots) {
                newFormattedSlots[slot.date]!.push({
                    id: slot.id,
                    start: slot.from,
                    end: slot.to,
                    title: slot.appointment ? `Session with ${slot.appointment.user.fullName}` : 'Free Slot',
                    summary: slot.appointment ? `User Email: ${slot.appointment.user.email}` : '',
                    color: slot.appointment ? '#EBCC00' : '#91969E'
                });
            } else {
                newFormattedSlots[slot.date] = [
                    {
                        id: slot.id,
                        start: slot.from,
                        end: slot.to,
                        title: slot.appointment ? `Session with ${slot.appointment.user.fullName}` : 'Free Slot',
                        summary: slot.appointment ? `User Email: ${slot.appointment.user.email}` : '',
                        color: slot.appointment ? '#EBCC00' : '#91969E'
                    }
                ];
            }
        }

        for (const date in newFormattedSlots) {
            for (const slot of newFormattedSlots[date]) {
                if (date in Object.keys(newMarkedDates)) {
                    continue;
                }

                if (slot.title.startsWith('Session with')) {
                    newMarkedDates[date] = {
                        marked: true,
                        dotColor: "#EBCC00"
                    };
                }
            }
        }
        
        setFormattedSlots({...newFormattedSlots});
        setMarkedDates({...newMarkedDates});
        setShouldUpdate(uuid.v4())
    },[timeSlots])
    

    const handleEventPress = (event:Event) => {
        const now = (new Date()).toISOString()
        if(event.title.startsWith('Session with') && now >= event.start){
            return
        }

        setShowModal({
            state:true, 
            id: event.id!, 
            name: event.title.slice(12,), 
            mode: event.title.startsWith('Session with') ? 'cancel':'delete'
        })
    }

    // const handleCreateSlot = (date:string) => {
    //     const start = moment(date)
    //     const end = start.clone().add(2, "hours")

    //     console.log(start)
    //     console.log(end)

    //     dispatch(addTimeSlot({
    //         id: uuid.v4(),
    //         from: start.toISOString(),
    //         to: end.toISOString(),
    //         isAvailable: true,
    //         appointment: null,
    //         date: start.format('YYYY MM DD')
    //     }))
    //     setShouldUpdate(uuid.v4())

    //     dispatch(createTimeSlot({
    //         from: start.toISOString(),
    //         to: end.toISOString(),
    //         date: start.format('YYYY MM DD')
    //     }))
    // }


    return (
        <View style={styles.container}>
            {showModal.state && <View className="z-10 absolute top-0 left-0 right-0 bottom-0 items-center justify-center w-full h-full" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <View className="rounded-lg bg-white w-[85%] items-center">
                    <View className="border-b border-custom-borderGrey w-[90%] items-center py-2">
                        <Text className="font-ubuntuM text-lg">{showModal.mode === 'cancel' ? 'Cancel Session?':'Delete time slot?'}</Text>
                    </View>
                    <View className="w-[90%] py-2">
                        <Text className="text-custom-textGrey font-ubuntu text-base">{showModal.mode === 'cancel' ? `This will cancel the session you had with ${showModal.name}`:'This will delete this timeslot'}</Text>
                    </View>
                    <View className="w-[90%] flex-row justify-between mt-3">
                        <Pressable className="w-1/2 items-center py-3 border-r border-t border-custom-borderGrey" onPress={() => setShowModal({state:false, id:'',name:'', mode:''})}>
                            <Text className="font-ubuntu text-base">Abort</Text>
                        </Pressable>
                        <Pressable 
                            className="w-1/2 items-center py-3 border-t border-custom-borderGrey" 
                            onPress={() => {
                                showModal.mode === 'cancel' && dispatch(cancelAppointment(showModal.id))
                                showModal.mode === 'delete' && dispatch(deleteTimeSlot(showModal.id))
                            }}
                            >
                            <Text className="font-ubuntu text-base">
                                {loading ? showModal.mode === 'cancel'?'Cancelling...':'Deleting...':'Proceed'}
                            </Text>
                        </Pressable>
                    </View>
                    
                </View>
                
            </View>}
            <CalendarProvider date={currentDate} showTodayButton>
                <ExpandableCalendar 
                    firstDay={1} 
                    theme={{
                        textMonthFontFamily: "Ubuntu-Regular",
                        textDayFontFamily: "Ubuntu-Regular",
                        textDayHeaderFontFamily: "Ubuntu-Regular",
                        arrowColor:'#EBCC00',
                        selectedDayBackgroundColor: "#EBCC00",
                        todayTextColor: "#EBCC00",
                    }}
                    markedDates={markedDates}
                />
                    <TimelineList
                        events={formattedSlots || {}}
                        showNowIndicator
                        scrollToFirst
                        initialTime={{ hour: 9, minutes: 0 }}
                        timelineProps={{
                            format24h: true,
                            start: 6,
                            end: 18,
                            theme:{
                                eventTitle:{
                                    fontFamily: 'Ubuntu-Medium',
                                    fontSize: 18
                                },
                                eventSummary:{
                                    fontFamily: 'Ubuntu-Regular',
                                    fontSize: 16,
                                    marginTop: 10
                                },
                                timeLabel:{
                                    fontFamily: 'Ubuntu-Regular',
                                    fontSize: 14
                                }
                            },
                            onEventPress: handleEventPress,
                            //onBackgroundLongPress: handleCreateSlot
                        }}
                        
                    />
            </CalendarProvider>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    position:'relative'
  },
  timeline: {
    width: screenWidth,
  },
  event: {
    borderRadius: 5,
    padding: 10,
  },
});

export default CalendarComponent;
