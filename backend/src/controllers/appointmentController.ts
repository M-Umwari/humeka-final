import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Appointment } from "../entities/Appointment";
import { TimeSlot } from "../entities/TimeSlot";
import User from "../entities/User";
import moment from "moment-timezone";
import sendEmail from "../helpers/emails/sendMail";
import { createGoogleMeet } from "../helpers/createGoogleMeet";


const appointmentRepository = AppDataSource.getRepository(Appointment);
const timeSlotRepository = AppDataSource.getRepository(TimeSlot);
const userRepository = AppDataSource.getRepository(User);


class AppointmentController {
  static async createAppointment(req: Request, res: Response) {
    const userId = req.user.id
    try {
      const { timeSlotId } = req.body;

      const user = await userRepository.findOne({ where: { id: userId } });

      const timeSlot = await timeSlotRepository.findOne({ where: { id: timeSlotId }, relations:["counselor"] })
      if (!timeSlot) return res.status(404).json({ message: "Time slot not found" })

      const bookedAppointment = await timeSlotRepository.findOne({
        where: { id: timeSlotId, isAvailable: false },
      });

      if (bookedAppointment) {
        return res.status(400).json({ message: "Time slot already booked" });
      }

      const {meetLink} = await createGoogleMeet(
        [user.email],
        timeSlot.counselor.email,
        new Date(timeSlot.from).toISOString(),
        new Date(timeSlot.to).toISOString(),
        `One on one counseling session between ${user.fullName} and Counselor ${timeSlot.counselor.fullName}`
      )

      if(!meetLink){
        return res.status(400).json({message:'Unable to create google meet link'})
      }

      const appointment = new Appointment();
      appointment.user = user;
      appointment.timeSlot = timeSlot;
      timeSlot.isAvailable = false
      appointment.meetingLink = meetLink


      await timeSlotRepository.save(timeSlot)
      await appointmentRepository.save(appointment);

      const data = {
        name: appointment.user.fullName,
        email: appointment.user.email,
        link: meetLink,
        counselorName: timeSlot.counselor.fullName,
        counselorEmail: timeSlot.counselor.email,
        date: moment(timeSlot.date).format('YYYY-MM-DD'),
        time: `${moment(timeSlot.from).tz('Africa/Kigali').format('h:mm A')} - ${moment(timeSlot.to).tz('Africa/Kigali').format('h:mm A')}`,
      }

      sendEmail('book', appointment.user.email, data)
      sendEmail('bookC', timeSlot.counselor.email, data)

      return res.status(201).json(appointment);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async cancelAppointment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const appointment = await appointmentRepository.findOne({
        where:{
          timeSlot:{id:id}
        }, 
        relations:["timeSlot","timeSlot.counselor","user"]
      });

      if (!appointment) return res.status(404).json({ message: "Appointment not found" });

      const timeSlot = await timeSlotRepository.findOneBy({id: appointment.timeSlot.id})
      timeSlot.isAvailable = true

      await appointmentRepository.remove(appointment)
      await timeSlotRepository.save(timeSlot)

      const data = {
          name: appointment.user.fullName,
          counselorName: appointment.timeSlot.counselor.fullName,
          counselorEmail: appointment.timeSlot.counselor.email,
          date: moment(timeSlot.date).format('YYYY-MM-DD'),
          time: `${moment(timeSlot.from).tz('Africa/Kigali').format('h:mm A')} - ${moment(timeSlot.to).tz('Africa/Kigali').format('h:mm A')}`,
      }

      sendEmail('cancel', appointment.user.email, data)

      return res.status(200).json({message:'Cancellation successful'});
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default AppointmentController;