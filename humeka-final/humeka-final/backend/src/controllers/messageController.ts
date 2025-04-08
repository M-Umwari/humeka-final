import Group from '../entities/Group';
import User from '../entities/User';
import { AppDataSource } from '../data-source';
import {Request, Response} from 'express'
import Message from '../entities/Message';
import moment from 'moment-timezone';
import sendNewMessage from '../helpers/sendMessage';


const userRepository = AppDataSource.getRepository(User)
const groupRepository = AppDataSource.getRepository(Group)
const messageRepository = AppDataSource.getRepository(Message)


export const sendMessage = async(req: Request, res:Response) => {  
    try{
        const userId = req.user!.id
        const {content, groupId} = req.body

        const user = await userRepository.findOne({ where: { id: userId } })
        const group = await groupRepository.findOne({ where: { id: groupId } })

        if (!group) return res.status(404).json({ message: "Group not found" })

        const newMessage = messageRepository.create({
            content,
            sender: user,
            group
        })    

        await messageRepository.save(newMessage)

        const formattedMessage = {
            ...newMessage,
            createdAt: moment(newMessage.createdAt).tz('Africa/Kigali').format("MMM D, [at] h:mm A")
        }

        await sendNewMessage(group.id, formattedMessage)

        return res.status(201).json(formattedMessage)
    }catch(error) {
        return res.status(500).json({ message: "Internal Server Error"})
    }
}

export const getMessagesByGroup = async(req:Request, res:Response) => {
    try{
        const {id} = req.params

        const messages = await messageRepository.find({
            where:{
                group:{id}
            },
            relations:['sender'],
            order:{createdAt:'ASC'}
        })

        const allMessages = messages.map(message => {
            return {
                ...message,
                createdAt: moment(message.createdAt).tz('Africa/Kigali').format("MMM D, [at] h:mm A")
            }
        })

        return res.json(allMessages)
    }catch(error) {
        return res.status(500).json({ message: "Internal Server Error"})
    }
}