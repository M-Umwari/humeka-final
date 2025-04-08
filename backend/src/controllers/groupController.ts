import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import Group from "../entities/Group";
import User from "../entities/User";
import GroupSession from "../entities/GroupSession";
import { createGoogleMeet } from "../helpers/createGoogleMeet";
import moment from 'moment-timezone'
import sendEmail from "../helpers/emails/sendMail";


const groupRepository = AppDataSource.getRepository(Group);
const userRepository = AppDataSource.getRepository(User);
const groupSessionRepository = AppDataSource.getRepository(GroupSession);

export class GroupController {
    static async createGroup(req: Request, res: Response) {
        try {
            const { name } = req.body

            if(!name){
                return res.status(400).json({message:'Validation error'})
            }

            const existingGroup = await groupRepository.findOne({ where: { name } })
            if (existingGroup) {
                return res.status(400).json({ message: "Group already exists" })
            }

            const group = groupRepository.create({ name })
            await groupRepository.save(group);

            const newGroup = await groupRepository.findOne({
                where: { id: group.id },
                relations: ["users"],
            });

            return res.status(201).json(newGroup)
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async getGroups(req: Request, res: Response) {
        try{
            const groups = await groupRepository.find({relations:["users"]})
            return res.json(groups)
        }catch(err){
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async joinGroup(req: Request, res: Response) {
        try {
            const userId = req.user.id
            const { groupId } = req.body

            const user = await userRepository.findOne({ where: { id: userId }, relations: ["groups"] });
            const group = await groupRepository.findOne({ where: { id: groupId }, relations: ["users"] })

            if (!group) return res.status(404).json({ message: "Group not found" });

            if (group.users.some(existingUser => existingUser.id === userId)) {
                return res.status(400).json({ message: "User is already in the group" });
            }

            group.users.push(user)
            await groupRepository.save(group)

            return res.status(200).json(group)
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async leaveGroup(req: Request, res: Response) {
        try {
            const userId = req.user.id
            const { groupId } = req.body;

            const group = await groupRepository.findOne({ where: { id: groupId }, relations: ["users"] })

            if (!group) return res.status(404).json({ message: "Group not found" })

            group.users = group.users.filter(existingUser => existingUser.id !== userId);
            await groupRepository.save(group)

            return res.status(200).json(group)
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async createGroupSession(req: Request, res: Response) {
        try {
            const { groupId, from, to, date, venue, description } = req.body;
            const counselorId = req.user.id;

            const counselor = await userRepository.findOne({ where: { id: counselorId } });
    
            if (!groupId || !from || !to || !date || !description) {
                return res.status(400).json({ message: "Missing required fields" });
            }
    
            const group = await groupRepository.findOne({ 
                where: { id: groupId }, 
                relations: ["users"] 
            });
    
            if (!group) {
                return res.status(404).json({ message: "Group not found" });
            }
    
            const session = new GroupSession();
            session.description = description
            session.from = from
            session.to = to
            session.date = date
            session.counselor = counselor
            session.group = group;
            session.users = group.users;
            
            if (venue) {
                session.venue = venue;
            }else {
                const counselorEmail = counselor.email;
                const userEmails = group.users.map(user => user.email)
                
                const summary = `${group.name} - Group Session`;
                const fromStr = new Date(from).toISOString();
                const toStr = new Date(to).toISOString();
                
                
                const {meetLink, eventId} = await createGoogleMeet(
                    userEmails, 
                    counselorEmail, 
                    fromStr, 
                    toStr, 
                    summary
                )
                
                if (!meetLink || !eventId) {
                    return res.status(500).json({ message: "Failed to create Google Meet" });
                }
                
                session.eventId = eventId;
                session.venue = "Online - Google Meet";
                session.meetingLink = meetLink;
            }
    
            const savedSession = await groupSessionRepository.save(session);

            for(const user of group.users){
                sendEmail('session', user.email, {
                    name: user.fullName,
                    counselorName: counselor.fullName,
                    counselorEmail: counselor.email,
                    groupName: group.name,
                    date: moment(session.date).format('YYYY-MM-DD'),
                    time: `${moment(session.from).tz('Africa/Kigali').format('h:mm A')} - ${moment(session.to).tz('Africa/Kigali').format('h:mm A')}`,
                    venue: session.venue,
                    link: session.meetingLink,
                    isOnline: !venue
                })
            }
            
            return res.status(201).json(savedSession);
        } catch (error) {
            console.error("Error creating group session:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async cancelGroupSession(req: Request, res: Response) {
        try {
            const sessionId  = req.params.id
            const userId = req.user.id;
    
            if (!sessionId) {
                return res.status(400).json({ message: "Session ID is required" });
            }
    
            const session = await groupSessionRepository.findOne({
                where: { id: sessionId },
                relations: ["counselor", "group", "group.users"]
            });
    
            if (!session) {
                return res.status(404).json({ message: "Group session not found" });
            }
    
            if (session.counselor.id !== userId) {
                return res.status(403).json({ message: "Only the session counselor can cancel it" });
            }
    
            await groupSessionRepository.remove(session);
    
            const counselor = session.counselor;
            const group = session.group;
    
            for (const user of group.users) {
                await sendEmail('session-cancel', user.email, {
                    name: user.fullName,
                    counselorName: counselor.fullName,
                    counselorEmail: counselor.email,
                    groupName: group.name,
                    date: moment(session.date).format('YYYY-MM-DD'),
                    time: `${moment(session.from).tz('Africa/Kigali').format('h:mm A')} - ${moment(session.to).tz('Africa/Kigali').format('h:mm A')}`,
                    venue: session.venue,
                    isOnline: session.meetingLink ? true : false,
                    description: session.description,
                });
            }
    
            return res.status(200).json({
                message: "Group session cancelled successfully"
            });
        } catch (error) {
            console.error("Error cancelling group session:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    
    static async getGroupSessions(req: Request, res: Response) {
        try {
            const userId = req.user.id;

            const groups = await groupRepository.createQueryBuilder("group")
                .innerJoinAndSelect("group.users", "user", "user.id = :userId")
                // .where("user.id = :userId", { userId })
                .getMany();
                
            if (groups.length === 0) {
                return res.status(200).json([])
            }
            
            const groupIds = groups.map(group => group.id);
            
            const sessions = await AppDataSource.getRepository(GroupSession)
                .createQueryBuilder("session")
                .innerJoinAndSelect("session.group", "group")
                .innerJoinAndSelect("session.counselor", "counselor")
                .where("group.id IN (:...groupIds)", { groupIds })
                .orderBy("session.date", "ASC")
                .addOrderBy("session.from", "ASC")
                .getMany();
            
            return res.status(200).json(sessions);
        } catch (error) {
            console.error("Error fetching group sessions:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async getOwnGroupSessions(req: Request, res: Response) {
        try{
            const counselorId = req.user.id

            const sessions = await groupSessionRepository.find({
                where: { counselor: {id: counselorId} },
                relations: ["group", "group.users"]
            })  

            return res.json(sessions)  
        }catch(err){
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
