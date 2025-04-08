import {io} from '../server'


const sendMessage = async(groupId:string, data:{[key:string]:any}) => {
    io.emit(`chat-room-${groupId}-new-message`, data)
}

export default sendMessage