import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinTable,
    ManyToMany,
} from 'typeorm';
import Note from './Note';
import Message from './Message';
import Group from './Group';
import { DefaultTimeSlot } from './DefaultTimeSlot';
import { TimeSlot } from './TimeSlot';
import { Appointment } from './Appointment';
import GroupSession from './GroupSession';
import dotenv from 'dotenv'
dotenv.config()

  
@Entity()
export default class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ unique: true })
    email!: string

    @Column()
    fullName!: string

    @Column()
    password!: string

    @Column({
        type: 'text',
        nullable:true,
        default: process.env.DEFAULT_IMG
    })
    profileImg!: string

    @Column({
        type: "enum",
        enum: ['counselor','user'],
        default: 'user'
    })
    role!: 'counselor'|'user'

    @Column('boolean', {default: true})
    active!: boolean

    @Column('text', {nullable: true})
    code!:string

    @OneToMany(() => Note, (note) => note.user)
    notes: Note[]

    @OneToMany(() => Message, (message) => message.sender)
    messages: Message[]

    @ManyToMany(() => Group, (group) => group.users)
    @JoinTable()
    groups: Group[]

    @OneToMany(() => DefaultTimeSlot, (slot) => slot.counselor)
    defaultTimeSlots: DefaultTimeSlot[]

    @OneToMany(() => TimeSlot, (slot) => slot.counselor)
    timeSlots: TimeSlot[]

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[]

    @Column('boolean',{default: false})
    hasTakenQuestionnaire: boolean

    @OneToMany(() => GroupSession, (session) => session.counselor)
    counselorGroupSessions: GroupSession[]

    @ManyToMany(() => GroupSession, (session) => session.users)
    groupSessions: GroupSession[]

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}