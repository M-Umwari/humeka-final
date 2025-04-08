import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getGroups, joinGroup, leaveGroup } from "@/redux/actions/groupActions";
import { resetStatus } from "@/redux/slices/groupSlice";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { BasicSkeletonGroup } from "@/components/skeletons/BasicSkeleton";
import { Group } from "@/types/Group";

const Index = () => {
    const router = useRouter()
    const {groups, loading, status, fetching} = useAppSelector(state => state.group)
    const {user} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const [showModal, setShowModal] = useState({state:false, name:'', id:''})
    const [showLeaveModal, setShowLeaveModal] = useState({state:false, name:'', id:''})
    const [showDetailsModal, setShowDetailsModal] = useState<{state:boolean, group:Group | null}>({state:false, group: null});
    
    useEffect(() => {
        dispatch(getGroups())
    },[])

    useEffect(() => {
        if(status === 'successful'){
            if(showModal.state){
                dispatch(resetStatus())
                setShowModal({state:false, id:'', name:''})
                router.push({pathname: `/counselor/chat/${showModal.id}`, params:{groupName:`#${showModal.name}`}})

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

            {showDetailsModal.state && showDetailsModal.group && (
                <View className="z-20 absolute top-0 left-0 right-0 bottom-0 items-center justify-center w-full h-full" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <View className="rounded-lg bg-white w-[90%] max-h-[90%]">
                        {/* Header */}
                        <View className="border-b border-gray-100 py-3 px-4 flex-row items-center justify-between">
                            <Text className="font-ubuntuB text-lg">Group Details</Text>
                            <Pressable onPress={() => setShowDetailsModal({state:false, group:null})}>
                                <Ionicons name="close" size={24} color="#666" />
                            </Pressable>
                        </View>
                        
                        {/* Group Info */}
                        <View className="px-4 py-4">
                            <View className="bg-[#FEF9E7] p-3 rounded-lg mb-4">
                                <Text className="font-ubuntuB text-xl">#{showDetailsModal.group.name}</Text>
                                <View className="flex-row items-center mt-2">
                                    <Entypo name="users" size={16} color="#EBCC00" />
                                    <Text className="font-ubuntu text-base ml-2">
                                        {showDetailsModal.group.users.length} members
                                    </Text>
                                </View>
                            </View>
                            
                            {/* Member List */}
                            <Text className="font-ubuntuM text-base mb-3">Members:</Text>
                            <ScrollView className="max-h-60">
                                {showDetailsModal.group.users.map((member, index) => (
                                    <View 
                                        key={member.id} 
                                        className={`py-3 px-2 flex-row items-center justify-between ${
                                            index !== showDetailsModal.group!.users.length - 1 ? 'border-b border-gray-100' : ''
                                        }`}
                                    >
                                        <Text className="font-ubuntu text-base">{member.fullName}</Text>
                                        {member.role === 'counselor' && (
                                            <View className="bg-[#FFF5D6] px-2 py-1 rounded">
                                                <Text className="text-custom-yellow text-xs font-ubuntu">Counselor</Text>
                                            </View>
                                        )}
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                        
                        {/* Action Buttons */}
                        <View className="border-t border-gray-100 py-3 px-4">
                            <Pressable 
                                className="bg-custom-yellow rounded-lg py-3 items-center"
                                onPress={() => {
                                    setShowDetailsModal({state:false, group:null});
                                    router.push({pathname: `/counselor/chat/${showDetailsModal.group!.id}`, params:{groupName:`#${showDetailsModal.group!.name}`}});
                                }}
                            >
                                <Text className="font-ubuntuB text-white">Go to Chat</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            )}
            
            <Pressable className="items-center justify-center absolute z-10 w-12 h-12 bottom-10 right-6 rounded-full bg-custom-yellow" onPress={() => router.push('/counselor/chat/createGroup')}>
                <Entypo name="plus" size={30} color="white" />
            </Pressable>
            <View className="w-[90%] mt-8">
                {!fetching && groups.map(group => (
                    <Pressable className={`p-4 border border-gray-100 rounded-xl w-full mb-4 ${group.users.find(theUser => theUser.id === user?.id) ? 'border-l-[5px] border-l-custom-yellow':''}`}
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
                                router.push({pathname: `/counselor/chat/${group.id}`, params:{groupName:`#${group.name}`}})
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
                        <View className="flex-row items-center justify-between mt-2">
                            <Text className="text-custom-textGrey font-ubuntu">{group.users.length} members</Text>
                            <Pressable onPress={() => setShowDetailsModal({state: true, group})} className="p-2">
                                <Text className="text-custom-yellow font-ubuntu text-sm">View</Text>
                            </Pressable>
                        </View> 
                    </Pressable>
                ))}
                {fetching && <BasicSkeletonGroup number={5}/>}
            </View>
        </View>
    );
}
 
export default Index;