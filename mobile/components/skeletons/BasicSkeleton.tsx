import { Skeleton } from "moti/skeleton";
import { View } from "react-native";


export const BasicSkeleton = () => {
    return (
        <View className="mb-6">
            <Skeleton colorMode="light" radius={8} width={'100%'} height={15}/>
            <View className="mt-3">
                <Skeleton colorMode="light" radius={8} width={'30%'} height={15}/>
            </View>
        </View>
    );
}
 
export const BasicSkeletonGroup = ({number}:{number:number}) => {
    return (
        <>
            {Array.from({length:number}).map((_, index) => (
                <BasicSkeleton key={index}/>
            ))}
        </>
    ) 
}