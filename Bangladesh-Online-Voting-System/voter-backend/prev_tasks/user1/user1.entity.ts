import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user1")
export class User1Entity {
    @PrimaryGeneratedColumn({ unsigned: true }) // setting unsigned for primary key
    id: number;

    @Column({ length: 100 }) // setting maximum length for varchar
    fullname: string;

    @Column({ unsigned: true }) // setting unsigned for age
    age: number;

    @Column({ default: 'active', enum: ['active', 'inactive'] }) // setting default value
    status: string;
}
