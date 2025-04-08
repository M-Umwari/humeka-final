import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm"
import User from "./User"
import Group from "./Group"


@Entity()
class GroupSession {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "text" })
    description: string

    @Column({type: 'timestamptz'})
    from: Date

    @Column({type: 'timestamptz'})
    to: Date

    @Column({type: 'date'})
    date: Date

    @Column('text')
    venue: string

    @Column('text')
    meetingLink: string

    @Column('text', {nullable: true})
    eventId: string

    @ManyToOne(() => User, (user) => user.counselorGroupSessions)
    counselor: User

    @ManyToOne(() => Group, (group) => group.groupSessions)
    group: Group

    @ManyToMany(() => User, (user) => user.groupSessions)
    users: User[]
}

export default GroupSession