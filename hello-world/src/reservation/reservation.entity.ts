import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    movieId: number;

    @Column({ type: 'timestamp'})
    reservationDate: Date;

    //https://docs.nestjs.com/techniques/database#relations
    @ManyToOne(() => User, (user) => user.reservations)
    @JoinColumn({ name: 'userId' })
    user: User;
}