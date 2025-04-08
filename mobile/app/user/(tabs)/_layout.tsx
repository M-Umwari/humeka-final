import { Entypo, MaterialIcons, Foundation, FontAwesome } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


const TabLayout = () => {
    return (
        <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
            <Tabs.Screen name="index" options={{
                tabBarIcon: ({focused}) => (<Entypo name="home" size={24} color={focused?"#EBCC00":"#64748B"} />)
            }}/>
            <Tabs.Screen name="chat" options={{
                tabBarIcon: ({focused}) => (<Ionicons name="chatbubble-ellipses" size={24} color={focused?"#EBCC00":"#64748B"} />)
            }}/>
            <Tabs.Screen name="book" options={{
                tabBarIcon: ({focused}) => (<FontAwesome6 name="calendar-day" size={20} color={focused?"#EBCC00":"#64748B"} />)
            }}/>
            <Tabs.Screen name="journal" options={{
                tabBarIcon: ({focused}) => (<FontAwesome5 name="tasks" size={22} color={focused?"#EBCC00":"#64748B"} />)
            }}/>
            <Tabs.Screen name="editProfile" options={{
                tabBarIcon: ({focused}) => (<Ionicons name="settings-sharp" size={24} color={focused?"#EBCC00":"#64748B"} />),
            }}/>
        </Tabs>
    );
}
 
export default TabLayout;