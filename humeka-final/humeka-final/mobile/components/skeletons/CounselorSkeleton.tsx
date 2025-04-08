import { Skeleton } from "moti/skeleton";
import { View } from "react-native";


export const CounselorSkeleton = () => {
    return (
        <View className="mr-3">
            <Skeleton colorMode="light" radius={5} width={160} height={128} />
        </View>
    );
}
 
export const CounselorSkeletonGroup = ({number}:{number:number}) => {
    return (
        <>
            {Array.from({length:number}).map((_,index) => (
                <CounselorSkeleton key={index}/>
            ))}
        </>
    ) 
}