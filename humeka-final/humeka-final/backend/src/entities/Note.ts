import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import dotenv from 'dotenv'
import User from './User';
dotenv.config()

  
@Entity()
export default class Note {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @ManyToOne(() => User, (user) => user.notes)
    user!: User

    @Column()
    note!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}