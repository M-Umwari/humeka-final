import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getGroups, joinGroup, leaveGroup } from "@/redux/actions/groupActions";
import { resetStatus } from "@/redux/slices/groupSlice";
import { BasicSkeletonGroup } from "@/components/skeletons/BasicSkeleton";

const Index = () => {
    const router = useRouter()
    const {groups, loading, status, fetching} = useAppSelector(state => state.group)
    const {user} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const [showModal, setShowModal] = useState({state:false, name:'', id:''})
    const [showLeaveModal, setShowLeaveModal] = useState({state:false, name:'', id:''})
    
    useEffect(() => {
        dispatch(getGroups())
    },[])

    useEffect(() => {
        if(status === 'successful'){
            if(showModal.state){
                dispatch(resetStatus())
                setShowModal({state:false, id:'', name:''})
                router.push({pathname: `/user/chat/${showModal.id}`, params:{groupName:`#${showModal.name}`}})

            }else if(showLeaveModal.state){
                dispatch(resetStatus())
                setShowLeaveModal({state:false, id:'', name:''})
            }
        }
    },[status])

    return (
        <View className="flex-1 items-center bg-white">
            {showModal.state && <View className="z-10 absolute top-0 left-0 right-0 bottom-0 items-center justify-center w-full h-full" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <View className="rounded-lg bg-white w-[85%] items-center">
                    <View className="border-b border-custom-borderGrey w-[90%] items-center py-2">
                        <Text className="font-ubuntuM text-lg">Alert</Text>
                    </View>
                    <View className="w-[90%] py-2">
                        <Text className="text-custom-textGrey font-ubuntu text-base">You are currently not a member of the <Text className="font-ubuntuB">{showModal.name}</Text> group. Would you like to join?</Text>
                    </View>
                    <View className="w-[90%] flex-row justify-between mt-3">
                        <Pressable className="w-1/2 items-center py-3 border-r border-t border-custom-borderGrey" onPress={() => setShowModal({state:false, id:'',name:''})}>
                            <Text className="font-ubuntu text-base">Cancel</Text>
                        </Pressable>
                        <Pressable 
                            className="w-1/2 items-center py-3 border-t border-custom-borderGrey" 
                            onPress={() => dispatch(joinGroup(showModal.id))}
                            >
                            <Text className="font-ubuntuB text-base text-custom-yellow">
                                {loading ? 'Joining...':'Join'}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>}
            {showLeaveModal.state && <View className="z-10 absolute top-0 left-0 right-0 bottom-0 items-center justify-center w-full h-full" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <View className="rounded-lg bg-white w-[85%] items-center">
                    <View className="border-b border-custom-borderGrey w-[90%] items-center py-2">
                        <Text className="font-ubuntuM text-lg">Alert</Text>
                    </View>
                    <View className="w-[90%] py-2">
                        <Text className="text-custom-textGrey font-ubuntu text-base">Are you sure you want to leave the <Text className="font-ubuntuB">{showLeaveModal.name}</Text> group?</Text>
                    </View>
                    <View className="w-[90%] flex-row justify-between mt-3">
                        <Pressable className="w-1/2 items-center py-3 border-r border-t border-custom-borderGrey" onPress={() => setShowLeaveModal({state:false, id:'',name:''})}>
                            <Text className="font-ubuntu text-base">Cancel</Text>
                        </Pressable>
                        <Pressable 
                            className="w-1/2 items-center py-3 border-t border-custom-borderGrey" 
                            onPress={() => dispatch(leaveGroup(showLeaveModal.id))}
                            >
                            <Text className="font-ubuntuB text-base text-red-500">
                                {loading ? 'Leaving...':'Leave'}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>}
            <View className="w-[90%] mt-8">
                {!fetching && groups.map(group => (
                    <Pressable 
                        className={`p-4 border border-gray-100 rounded-xl w-full mb-4 ${group.users.find(theUser => theUser.id === user?.id) ? 'border-l-[5px] border-l-custom-yellow':''}`}
                        key={group.id}
                        style={{
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 2,
                            elevation: 2,
                            backgroundColor: 'white'
                        }}
                        onPress={() => {
                            const existingUser = group.users.find(theUser => theUser.id === user?.id)
                            if(existingUser){
                                router.push({pathname: `/user/chat/${group.id}`, params:{groupName:`#${group.name}`}})
                            }else{
                                setShowModal({state:true, id: group.id, name: group.name})
                            }
                        }}
                        onLongPress={() => {
                            const existingUser = group.users.find(theUser => theUser.id === user?.id)
                            if(!existingUser) return
                            setShowLeaveModal({state:true, id: group.id, name: group.name})
                        }}
                        >
                        <View className="flex-row items-center justify-between">
                            <Text className="text-base font-ubuntuM">#{group.name}</Text>
                            {group.users.find(theUser => theUser.id === user?.id) && <View className="bg-[#E8F5E9] px-2 py-1 rounded">
                                <Text className="text-[#2E7D32] text-xs font-ubuntu">Joined</Text>
                            </View>}    
                        </View>    
                        <Text className="text-custom-textGrey font-ubuntu mt-2">{group.users.length} members</Text>
                    </Pressable>
                ))}
                {fetching && <BasicSkeletonGroup number={5}/>}
            </View>
        </View>
    );
}
 
export default Index;