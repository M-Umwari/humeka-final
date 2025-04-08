import Button from '@/components/Button';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {Text, View, ScrollView, TextInput} from 'react-native'
import Checkbox from 'expo-checkbox';
import RadioGroup from 'react-native-radio-buttons-group';
import { useFormik } from 'formik';
import questionnaireSchema from '@/validationSchema/questionnaireSchema';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { submitQuestionnaire } from '@/redux/actions/userActions';
import { resetStatus } from '@/redux/slices/userSlice';


const Form = () => {
    const router = useRouter()
    const [isChecked, setChecked] = useState(false);
    const [selectedId, setSelectedId] = useState<string | undefined>()
    const dispatch = useAppDispatch()
    const {loading, status} = useAppSelector(state => state.user)
    const [radioButtons, setRadioButtons] = useState([
        {
          id: '1',
          label: 'Always',
          value: 'Always',
          color:'#E2E8F0',
          borderColor: '#E2E8F0',
          size: 22
        },
        {
          id: '2',
          label: 'Sometimes',
          value: 'Sometimes',
          color:'#E2E8F0',
          borderColor: '#E2E8F0',
          size: 22
        },
        {
          id: '3',
          label: 'Rarely',
          value: 'Rarely',
          color:'#E2E8F0',
          borderColor: '#E2E8F0',
          size: 22
        },
        {
          id: '4',
          label: 'Never',
          value: 'Never',
          color:'#E2E8F0',
          borderColor: '#E2E8F0',
          size: 22,
        }
    ]);

    const formik = useFormik({
        initialValues:{
            mood: "",
            emotions: [] as string[],
            energy: "",
            stress: "",
            interest: "",
            support: "",
        },
        onSubmit: (formData) => {
            dispatch(submitQuestionnaire({
                ...formData,
                mood: parseInt(formData.mood),
                energy: parseInt(formData.energy),
                stress: parseInt(formData.stress),
                interest: parseInt(formData.interest)
            }))
        },
        validationSchema: questionnaireSchema
    })

    const handleRadioBtnChange = (id:string) => {
        setSelectedId(id)
        setRadioButtons(radioButtons.map((btn) => {
            if(btn.id === id){
                formik.setFieldValue('support', btn.value, true)
                return {
                    ...btn,
                    color: '#EBCC00',
                    borderColor: '#EBCC00'
                }
            }else{
                return {
                    ...btn,
                    color: '#E2E8F0',
                    borderColor: '#E2E8F0'
                }
            }
        }))
    }

    const handleEmotionChange = (value:string) => {
        formik.setFieldValue(
            'emotions', 
            formik.values.emotions.includes(value) ? formik.values.emotions.filter(x => x !== value) : [...formik.values.emotions, value]
        )
    }

    useEffect(() => {
        if(status === 'successful'){
            dispatch(resetStatus())
            router.replace('/user/questionnaire/feedback')
        }
    },[status])
    
    return (
        <View className="flex-1 items-center bg-white">
            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} className="w-[90%]">
                <Text className="font-ubuntu text-base mt-8">This questionnaire will help us understand your emotional and mental well-being to connect you with the most suitable support group.</Text>
                <View className='w-full mt-8'>
                    <Text className='font-ubuntuM text-base'>How would you rate your overall mood in the past week?</Text>
                    <Text className='text-custom-grey mt-2 font-ubuntu'>(0 = Extremely low mood, 5 = Extremely positive mood)</Text>
                    <TextInput 
                        className={`w-20 h-12 px-2 border ${formik.touched.mood && formik.errors.mood? 'border-red-500':"border-custom-borderGrey"} rounded-md font-ubuntu bg-[#f2f2f2] mt-4`}
                        onChangeText={formik.handleChange('mood')}
                        onBlur={formik.handleBlur('mood')}
                        value={formik.values.mood}
                        keyboardType="number-pad"
                    />
                    {formik.touched.mood && formik.errors.mood && <Text className="text-red-500 text-xs font-ubuntu mt-2">{formik.errors.mood}</Text>}
                </View>
                <View className='w-full mt-8'>
                    <Text className='font-ubuntuM text-base'>Which emotions have you experienced most often in the past week? Select all that apply.</Text>
                    <View className='mt-4 flex-row w-full items-center'>
                        <View>
                            <View className="flex-row items-center mb-3">
                                <Checkbox
                                    className="border border-custom-borderGrey bg-[#f2f2f2]"
                                    value={formik.values.emotions.includes('Happy')}
                                    onValueChange={() => handleEmotionChange('Happy')}
                                    color={formik.values.emotions.includes('Happy') ? '#EBCC00' : undefined}
                                />
                                <Text className="text-sm font-ubuntu ml-4">
                                    Happy 😊
                                </Text>
                            </View>
                            <View className="flex-row items-center mb-3">
                                <Checkbox
                                    className="border border-custom-borderGrey bg-[#f2f2f2]"
                                    value={formik.values.emotions.includes('Sad')}
                                    onValueChange={() => handleEmotionChange('Sad')}
                                    color={formik.values.emotions.includes('Sad') ? '#EBCC00' : undefined}
                                />
                                <Text className="text-sm font-ubuntu ml-4">
                                    Sad 😢
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <Checkbox
                                    className="border border-custom-borderGrey bg-[#f2f2f2]"
                                    value={formik.values.emotions.includes('Lonely')}
                                    onValueChange={() => handleEmotionChange('Lonely')}
                                    color={formik.values.emotions.includes('Lonely') ? '#EBCC00' : undefined}
                                />
                                <Text className="text-sm font-ubuntu ml-4">
                                    Lonely 😔
                                </Text>
                            </View>
                        </View>
                        <View className='ml-8'>
                            <View className="flex-row items-center mb-3">
                                <Checkbox
                                    className="border border-custom-borderGrey bg-[#f2f2f2]"
                                    value={formik.values.emotions.includes('Anxious')}
                                    onValueChange={() => handleEmotionChange('Anxious')}
                                    color={formik.values.emotions.includes('Anxious') ? '#EBCC00' : undefined}
                                />
                                <Text className="text-sm font-ubuntu ml-4">
                                    Anxious 😊
                                </Text>
                            </View>
                            <View className="flex-row items-center mb-3">
                                <Checkbox
                                    className="border border-custom-borderGrey bg-[#f2f2f2]"
                                    value={formik.values.emotions.includes('Angry')}
                                    onValueChange={() => handleEmotionChange('Angry')}
                                    color={formik.values.emotions.includes('Angry') ? '#EBCC00' : undefined}
                                />
                                <Text className="text-sm font-ubuntu ml-4">
                                    Angry 😢
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <Checkbox
                                    className="border border-custom-borderGrey bg-[#f2f2f2]"
                                    value={formik.values.emotions.includes('Hopeless')}
                                    onValueChange={() => handleEmotionChange('Hopeless')}
                                    color={formik.values.emotions.includes('Hopeless') ? '#EBCC00' : undefined}
                                />
                                <Text className="text-sm font-ubuntu ml-4">
                                    Hopeless 😔
                                </Text>
                            </View>
                        </View>  
                    </View>
                </View>
                <View className='w-full mt-8'>
                    <Text className='font-ubuntuM text-base mb-4'>How often do you feel like you have someone to talk to about your problems?</Text>
                    <RadioGroup
                        radioButtons={radioButtons}
                        containerStyle={{alignItems:'flex-start'}}
                        labelStyle={{fontFamily:'Ubuntu-Regular', fontSize:14}}
                        selectedId={selectedId}
                        onPress={handleRadioBtnChange}
                    />
                </View>
                <View className='w-full mt-8'>
                    <Text className='font-ubuntuM text-base'>How energetic or motivated have you felt in the past week?</Text>
                    <Text className='text-custom-grey mt-2 font-ubuntu'>(0 = No Energy or Motivation, 5 = Highly Energetic and Motivated)</Text>
                    <TextInput 
                        className={`w-20 h-12 px-2 border ${formik.touched.energy && formik.errors.energy ? 'border-red-500':"border-custom-borderGrey"} rounded-md font-ubuntu bg-[#f2f2f2] mt-4`}
                        onChangeText={formik.handleChange('energy')}
                        onBlur={formik.handleBlur('energy')}
                        value={formik.values.energy}
                        keyboardType="number-pad"
                    />
                    {formik.touched.energy && formik.errors.energy && <Text className="text-red-500 text-xs font-ubuntu mt-2">{formik.errors.energy}</Text>}
                </View>
                <View className='w-full mt-8'>
                    <Text className='font-ubuntuM text-base'>How stressed or anxious have you felt in the past week?</Text>
                    <Text className='text-custom-grey mt-2 font-ubuntu'>(0 = Not Stressed or Anxious at All, 5 = Extremely Stressed or Anxious)</Text>
                    <TextInput 
                        className={`w-20 h-12 px-2 border ${formik.touched.stress && formik.errors.stress?'border-red-500':"border-custom-borderGrey"} rounded-md font-ubuntu bg-[#f2f2f2] mt-4`}
                        onChangeText={formik.handleChange('stress')}
                        onBlur={formik.handleBlur('stress')}
                        value={formik.values.stress}
                        keyboardType="number-pad"
                    />
                    {formik.touched.stress && formik.errors.stress && <Text className="text-red-500 text-xs font-ubuntu mt-2">{formik.errors.stress}</Text>}
                </View>
                <View className='w-full mt-8'>
                    <Text className='font-ubuntuM text-base'>How interested have you been in activities you usually enjoy?</Text>
                    <Text className='text-custom-grey mt-2 font-ubuntu'>(0 = No Interest at All, 5 = Highly Interested)</Text>
                    <TextInput 
                        className={`w-20 h-12 px-2 border ${formik.touched.interest && formik.errors.interest?'border-red-500':"border-custom-borderGrey"} rounded-md font-ubuntu bg-[#f2f2f2] mt-4`}
                        onChangeText={formik.handleChange('interest')}
                        onBlur={formik.handleBlur('interest')}
                        value={formik.values.interest}
                        keyboardType="number-pad"
                    />
                    {formik.touched.interest && formik.errors.interest && <Text className="text-red-500 text-xs font-ubuntu mt-2">{formik.errors.interest}</Text>}
                </View>
                <Button text={loading?"Submitting...":"Submit"} onPress={() => formik.handleSubmit()} styles={`${loading?"opacity-80":"opacity-100"} my-12`}/>
            </ScrollView>    
        </View>
    );
}
 
export default Form;