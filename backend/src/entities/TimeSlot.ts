import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import User from "./User"
import { Appointment } from "./Appointment"


@Entity()
export class TimeSlot {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: 'timestamptz'})
    from: Date

    @Column({type: 'timestamptz'})
    to: Date

    @Column({type: 'date'})
    date: Date

    @ManyToOne(() => User, (user) => user.timeSlots)
    counselor: User

    @OneToOne(() => Appointment, (appointment) => appointment.timeSlot, {nullable:true, onDelete:'SET NULL'})
    @JoinColumn()
    appointment: Appointment | null

    @Column('boolean',{default:true})
    isAvailable: boolean

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}