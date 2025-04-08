import { Pressable, View, Text } from "react-native";


interface IProps {
    text:any,
    onPress: () => void,
    styles?:string
    textStyles?:string
}

const Button = ({text, onPress, styles, textStyles}:IProps) => {
    return (
        <Pressable className={`w-full h-12 ${styles}`} onPress={onPress}>
            <View className="w-full h-full bg-custom-yellow items-center justify-center rounded-md">
                <Text className={`text-white font-ubuntuM text-base ${textStyles}`}>{text}</Text>
            </View>
        </Pressable>
    );
}
 
export default Button;