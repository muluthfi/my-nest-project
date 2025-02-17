import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;
}