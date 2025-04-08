import { Request, Response } from "express";
import User from "../entities/User";
import { AppDataSource } from "../data-source";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Group from "../entities/Group";
import sendEmail from "../helpers/emails/sendMail";
import {Not} from 'typeorm'
dotenv.config()

const userRepository = AppDataSource.getRepository(User)
const groupRepository = AppDataSource.getRepository(Group);


export async function signUp (req:Request,res:Response) {
    try{
        const formData = req.body;
        
        const user = await userRepository.findOne({where:{ email: formData.email }});
        if (user) {
            return res
            .status(409)
            .json({ status: 'error', message: 'Email already in use' });
        }
        
        const hashedPassword = await bcrypt.hash(formData.password, 10);
        
        const newUser = new User()

        newUser.fullName = formData.fullName
        newUser.email = formData.email
        newUser.password = hashedPassword
        
        const savedUser = await userRepository.save(newUser);

        sendEmail('welcome', formData.email, null)
        
        return res
            .status(201)
            .json({ status: 'success', message: 'Signup successful', data:{email: savedUser.email} });
    }catch(err){
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export async function login (req:Request,res:Response) {
    try{
        const formData = req.body;

        const user = await userRepository.findOne({where:{ email: formData.email }});
        if (!user) {
            return res
            .status(404)
            .json({ status: 'error', message: 'Account not found' });
        }

        if(!user.active){
            return res.status(409).json({status:'error', message: 'Account Inactive'})
        }
        
        const passwordMatch: boolean = await bcrypt.compare(
            formData.password,
            user.password
        );
        if (!passwordMatch) {
            return res
            .status(401)
            .json({ status: 'error', message: 'Incorrect password' });
        }

        const token = await jwt.sign(
            {
                user:{
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            }, 
            process.env.JWT_SECRET as string,
            {expiresIn: '7d'}
        )
        
        return res
            .status(200)
            .json({ status: 'success', message: 'Login successful', token });
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export async function getOwnProfile(req:Request,res:Response) {
    const userId = req.user!.id

    try{
        const userProfile = await userRepository.findOne({
            where:{
                id: userId
            }
        })

        return res.json(userProfile)
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export async function getAllCounselors(req:Request,res:Response){
    try{
        const counselors = await userRepository.find({
            where:{
                role:'counselor'
            }
        })

        return res.json(counselors)
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export const changePassword = async (req: Request, res: Response) => {
    try{
        const userId = req.user.id
        const {oldPassword, newPassword} = req.body
    
        const user = await userRepository.findOne({where:{id: userId}})
    
        const passwordMatch: boolean = await bcrypt.compare(
            oldPassword,
            user.password
            );
            if (!passwordMatch) {
                return res
                .status(401)
                .json({ message: 'Incorrect password' });
            }
    
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword
    
        await userRepository.save(user)
    
        return res.json({message:'Password changed successfully. Please login again'})
    }catch(err){
        return res.status(500).json({message: 'Internal Server Error', status:'error'})
    }
}

export const editProfile = async(req: Request, res: Response) => {
    try{
        const userId = req.user.id
        const {fullName, profileImg, email} = req.body

        const user = await userRepository.findOne({where:{id: userId}})

        user.fullName = fullName ?? user.fullName
        user.profileImg = profileImg ?? user.profileImg
        
        const existingEmail = await userRepository.findOne({
            where:{
                id: Not(userId),
                email: email
            }
        })

        if(existingEmail){
            return res.status(409).json({message:'Email already in use'})
        }

        user.email = email ?? user.email

        await userRepository.save(user)

        return res.json(user)
    }catch(err){
        return res.status(500).json({message: 'Internal Server Error', status:'error'})
    }
}

export const recommendSupportGroup = async(req: Request, res: Response) => {
    try{
        const userId = req.user.id
        const { mood, emotions, energy, stress, interest, support } = req.body

        let depressionScore = 0
        let anxietyScore = 0
        let lonelinessScore = 0

        if (mood <= 2) depressionScore += 2
        if (emotions.includes("Hopeless")) depressionScore += 2
        if (energy <= 2) depressionScore++
        if (interest <= 2) depressionScore++

        if (stress >= 4) anxietyScore += 2
        if (emotions.includes("Anxious")) anxietyScore += 2

        if (support === "Never") lonelinessScore += 3
        if (emotions.includes("Lonely")) lonelinessScore += 2
        if (interest <= 2) lonelinessScore++

        //const scores = { Depression: depressionScore, Anxiety: anxietyScore, Loneliness: lonelinessScore }
        const maxScore = Math.max(depressionScore, anxietyScore, lonelinessScore)

        const user = await userRepository.findOne({where:{id: userId}})
        user.hasTakenQuestionnaire = true
        await userRepository.save(user)
        //const recommendedGroups = Object.keys(scores).filter(group => scores[group] === maxScore)

        if (maxScore === depressionScore) return res.json({supportGroup: {name:"Depression", id:'1327f2e9-6ec7-4abc-8ce5-55746aea60ec'}})
        if (maxScore === anxietyScore) return res.json({supportGroup: {name:"Anxiety", id:'66aa89c1-91bc-4275-a131-960ef82f6e11'}})
        return res.json({supportGroup: {name:"Loneliness", id:'f3a4641f-82b6-4efe-ab5b-28fd520bc113'}})
    }catch(err){
        return res.status(500).json({message: 'Internal Server Error', status:'error'})
    }
}

export async function changeUserRole(req:Request,res:Response) {
    try{
        const {role} = req.body
        const userId = req.params.id
        
        const user = await userRepository.findOne({
            where:{
                id: userId
            }
        })

        user.role = role
        await userRepository.save(user)

        return res.json(user)
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export async function requestCode(req:Request,res:Response) {
    try{
        const {email} = req.body
        
        const user = await userRepository.findOne({
            where:{
                email: email
            }
        })

        if(!user){
            return res.status(404).json({message:'Account not found'})
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString()

        user.code = code
        await userRepository.save(user)

        await sendEmail('reset', email, {code, name: user.fullName})

        return res.json({code, email})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export async function verifyCode(req:Request,res:Response) {
    try{
        const {email, code} = req.body
        
        const user = await userRepository.findOne({
            where:{
                email: email,
                code: code
            }
        })

        if(!user){
            return res.status(409).json({message:'Invalid code'})
        }

        user.code = null
        await userRepository.save(user)

        return res.json({message:'Code verified successfully. You can now reset your password'})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export async function resetPassword(req:Request,res:Response) {
    try{
        const {email, newPassword} = req.body
        
        const user = await userRepository.findOne({
            where:{
                email: email
            }
        })

        if(!user){
            return res.status(404).json({message:'Account not found'})
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        await userRepository.save(user)

        return res.json({message:'Password reset successfully. Please login'})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal Server Error"})
    }
}