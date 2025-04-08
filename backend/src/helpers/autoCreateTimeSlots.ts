import { TimeSlot } from "../entities/TimeSlot";
import { AppDataSource } from "../data-source";
import { DefaultTimeSlot } from "../entities/DefaultTimeSlot";
import User from "../entities/User";
import { LessThan, MoreThan } from "typeorm";


const timeSlotRepository = AppDataSource.getRepository(TimeSlot)
const defaultTimeSlotRepository = AppDataSource.getRepository(DefaultTimeSlot)
//const userRepository = AppDataSource.getRepository(User)


export const autoCreateTimeSlots = async() => {
    console.log("autocreating timeslots......")
    try{
        const today = new Date();
        today.setHours(0,0,0,0)
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + 7);
    
        const defaultTimeSlots = await defaultTimeSlotRepository.find({
            relations:["counselor"]
        });
    
        // Loop through the next two weeks
        for (let date = new Date(today); date <= endDate; date.setDate(date.getDate() + 1)) {
            const dayOfWeek = date.getDay();
    
            // Skip weekends (Saturday: 6, Sunday: 0)
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                continue;
            }
    
            // Create time slots for each default time slot
            for (const defaultSlot of defaultTimeSlots) {
                // Create new Date objects for 'from' and 'to' with the current date
                const fromDateTime = new Date(date);
                fromDateTime.setHours(defaultSlot.from.getHours(), defaultSlot.from.getMinutes());
    
                const toDateTime = new Date(date);
                toDateTime.setHours(defaultSlot.to.getHours(), defaultSlot.to.getMinutes());
    
                const existingSlots = await timeSlotRepository.find({
                    where:{
                        counselor:{id: defaultSlot.counselor.id},
                        date: new Date(date),
                        from: LessThan(toDateTime),
                        to: MoreThan(fromDateTime)
                    }
                    
                });
    
                if(existingSlots.length > 0){
                    continue
                }
    
                const newTimeSlot = timeSlotRepository.create({
                    from: fromDateTime,
                    to: toDateTime,
                    date: date,
                    counselor: defaultSlot.counselor
                }); 
    
                await timeSlotRepository.save(newTimeSlot)
            }
        }
    }catch(err){
        console.log("Error auto creating timeslots", err)
    }
    
}