import { Skeleton } from "moti/skeleton";
import { View } from "react-native";


export const DefaultTimeSlotSkeleton = () => {
    return (
        <View className="mb-4">
            <Skeleton colorMode="light" radius={8} width={'100%'} height={50}/>
        </View>
    );
}
 
export const DefaultTimeSlotSkeletonGroup = ({number}:{number:number}) => {
    return (
        <>
            {Array.from({length:number}).map((_, index) => (
                <DefaultTimeSlotSkeleton key={index}/>
            ))}
        </>
    ) 
}