import { Request, Response } from "express";
import { getRepository, LessThan, MoreThan, MoreThanOrEqual, Not } from "typeorm";
import { TimeSlot } from "../entities/TimeSlot";
import { DefaultTimeSlot } from "../entities/DefaultTimeSlot";
import moment from "moment-timezone";
import { AppDataSource } from "../data-source";
import User from "../entities/User";


const timeSlotRepository = AppDataSource.getRepository(TimeSlot)
const defaultTimeSlotRepository = AppDataSource.getRepository(DefaultTimeSlot)
const userRepository = AppDataSource.getRepository(User)


export class TimeSlotController {
    static async createTimeSlot (req: Request, res: Response) {
        const userId = req.user.id
        const formData = req.body;

        try {
            const existingSlots = await timeSlotRepository.find({
                where: {
                    counselor:{id: userId},
                    date: formData.date,
                    from: LessThan(formData.to),
                    to: MoreThan(formData.from)
                }
            });

            if (existingSlots.length > 0) {
                return res.status(409).json({ message: 'Time slot overlaps with already existing ones' });
            }

            const user = await userRepository.findOneBy({id:userId})

            const newTimeSlot = timeSlotRepository.create({
                from: formData.from,
                to: formData.to,
                date: formData.date,
                counselor: user
            });

            const savedTimeSlot = await timeSlotRepository.save(newTimeSlot);
            return res.status(201).json(savedTimeSlot);
        } catch (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async getAllTimeSlots (req: Request, res: Response) {
        const counselorId = req.params.id
        try {
            const timeSlots = await timeSlotRepository.find({
                where:{counselor:{id:counselorId}}, 
                relations: ["appointment","appointment.user"]
            });

            return res.status(200).json(timeSlots);
        } catch (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async getActiveDates (req: Request, res: Response) {
        const counselorId = req.params.id
        try {
            const startDate = new Date();
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date();
            endDate.setDate(startDate.getDate() + 14);
            endDate.setHours(23, 59, 59, 999);

            const uniqueDates = await timeSlotRepository
                .createQueryBuilder("timeSlot")
                .select("timeSlot.date", "activeDate")
                .where("timeSlot.counselorId = :counselorId", { counselorId })
                .andWhere("timeSlot.date BETWEEN :startDate AND :endDate", { startDate, endDate })
                .andWhere("timeSlot.isAvailable = true")
                .groupBy("date")
                .orderBy("date", "ASC")
                .getRawMany();

            const activeDates = uniqueDates.map(slot => slot.activeDate.toISOString().split('T')[0]);
            return res.status(200).json(activeDates);
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async getTimeSlotsByDate (req: Request, res: Response) {
        const counselorId = req.params.id
        try {
            const date = req.params.date;
            const timeSlots = await timeSlotRepository.find({
                where: {
                    counselor:{id: counselorId},
                    date: new Date(date),
                    isAvailable: true,
                    from: MoreThanOrEqual(new Date())
                },
                order: { from: "ASC" }
            });

            const formattedSlots = timeSlots.map(slot => ({
                id: slot.id,
                from: moment(slot.from).tz('Africa/Kigali').format('h:mm A'),
                to: moment(slot.to).tz('Africa/Kigali').format('h:mm A'),
                date: slot.date,
                isAvailable: slot.isAvailable
            }));

            return res.status(200).json(formattedSlots);
        } catch (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async updateTimeSlot (req: Request, res: Response) {
        const { id } = req.params;
        const formData = req.body;
        const { from, to, date } = formData;

        try {
            const timeSlot = await timeSlotRepository.findOne({ where: {id:id, isAvailable: true } });

            if (!timeSlot) {
                return res.status(404).json({ message: 'You cannot edit already booked time slots' });
            }

            const existingSlots = await timeSlotRepository.find({
                where: {
                    id: Not(id),
                    date: date,
                    from: LessThan(formData.to),
                    to: MoreThan(formData.from)
                }
            });

            if (existingSlots.length > 0) {
                return res.status(409).json({ message: 'Time slot overlaps with already existing ones' });
            }

            timeSlot.from = from || timeSlot.from;
            timeSlot.to = to || timeSlot.to;
            timeSlot.date = date || timeSlot.date;

            const updatedTimeSlot = await timeSlotRepository.save(timeSlot);
            return res.status(200).json(updatedTimeSlot);
        } catch (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async deleteTimeSlot (req: Request, res: Response) {
        const { id } = req.params;

        try {
            const bookedSlot = await timeSlotRepository.findOne({ where: { id:id, isAvailable: false } })
            if (bookedSlot) {
                return res.status(409).json({ message: 'You cannot delete a booked time slot' })
            }

            const deletedTimeSlot = await timeSlotRepository.delete(id)
            if (!deletedTimeSlot) {
                return res.status(404).json({ message: 'Time slot not found' })
            }

            return res.status(204).json({})
        } catch (err) {
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    static async createDefaultTimeSlot (req: Request, res: Response) {
        const userId = req.user.id
        const formData = req.body

        try {
            const existingSlots = await defaultTimeSlotRepository.find({
                where: {
                    counselor:{id: userId},
                    from: LessThan(formData.to),
                    to: MoreThan(formData.from)
                }
            });

            if (existingSlots.length > 0) {
                return res.status(409).json({ message: 'Time slot overlaps with already existing ones' })
            }

            const user = await userRepository.findOneBy({id: userId})

            const newTimeSlot = defaultTimeSlotRepository.create({
                from: formData.from,
                to: formData.to,
                counselor: user
            });

            const savedTimeSlot = await defaultTimeSlotRepository.save(newTimeSlot)
            return res.status(201).json({
                id: savedTimeSlot.id,
                fromFull: savedTimeSlot.from,
                toFull: savedTimeSlot.to,
                from: moment(savedTimeSlot.from).tz('Africa/Kigali').format('h:mm A'),
                to: moment(savedTimeSlot.to).tz('Africa/Kigali').format('h:mm A'),
            });
        } catch (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async getDefaultTimeSlots (req: Request, res: Response) {
        const userId = req.user.id
        try {
            const timeSlots = await defaultTimeSlotRepository.find({
                where:{
                    counselor:{id: userId}
                }, 
                order: { from: "ASC" } 
            });

            const formattedSlots = timeSlots.map(slot => ({
                id: slot.id,
                fromFull: slot.from,
                toFull: slot.to,
                from: moment(slot.from).tz('Africa/Kigali').format('h:mm A'),
                to: moment(slot.to).tz('Africa/Kigali').format('h:mm A'),
            }));

            return res.status(200).json(formattedSlots);
        } catch (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async updateDefaultTimeSlot (req: Request, res: Response) {
        const { id } = req.params;
        const formData = req.body;
        const { from, to } = formData;

        try {
            const timeSlot = await defaultTimeSlotRepository.findOneBy({id});

            if (!timeSlot) {
                return res.status(404).json({ message: 'Time slot not found' })
            }

            const existingSlots = await defaultTimeSlotRepository.find({
                where: {
                    id: Not(id),
                    from: LessThan(formData.to),
                    to: MoreThan(formData.from)
                }
            });

            if (existingSlots.length > 0) {
                return res.status(409).json({ message: 'Time slot overlaps with already existing ones' })
            }

            timeSlot.from = from || timeSlot.from
            timeSlot.to = to || timeSlot.to

            const updatedTimeSlot = await defaultTimeSlotRepository.save(timeSlot)
            return res.status(200).json({
                id: updatedTimeSlot.id,
                fromFull: updatedTimeSlot.from,
                toFull: updatedTimeSlot.to,
                from: moment(updatedTimeSlot.from).tz('Africa/Kigali').format('h:mm A'),
                to: moment(updatedTimeSlot.to).tz('Africa/Kigali').format('h:mm A')
            })
        } catch (err) {
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    static async deleteDefaultTimeSlot (req: Request, res: Response) {
        const { id } = req.params
        try {
            const timeSlot = await defaultTimeSlotRepository.findOneBy({id})
            if (!timeSlot) {
                return res.status(404).json({ message: 'Time slot not found' })
            }

            await defaultTimeSlotRepository.remove(timeSlot)
            
            return res.status(204).json({})
        } catch (err) {
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }
}
