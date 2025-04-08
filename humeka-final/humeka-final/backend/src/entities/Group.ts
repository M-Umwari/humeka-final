import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm"
import User from "./User"
import Message from "./Message"
import GroupSession from "./GroupSession"


@Entity()
class Group {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "text" })
    name: string

    @ManyToMany(() => User, (user) => user.groups)
    users: User[]

    @OneToMany(() => Message, (message) => message.group)
    messages: Message[]

    @OneToMany(() => GroupSession, (groupSession) => groupSession.group)
    groupSessions: GroupSession[]
}

export default Group