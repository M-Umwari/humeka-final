import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "./User";


@Entity()
export class DefaultTimeSlot {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: 'timestamptz'})
    from: Date

    @Column({type: 'timestamptz'})
    to: Date

    @ManyToOne(() => User, (user) => user.defaultTimeSlots)
    counselor: User

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}