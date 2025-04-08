import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import User from "./User"
import Group from "./Group"


@Entity()
class Message {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "text" })
    content: string

    @ManyToOne(() => User, (user) => user.messages)
    sender: User

    @ManyToOne(() => Group, (group) => group.messages)
    group: Group

    @CreateDateColumn({type:'timestamptz'})
    createdAt: Date
}

export default Message