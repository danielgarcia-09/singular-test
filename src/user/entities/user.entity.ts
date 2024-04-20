import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    isPasswordValid(password: string) {
        return bcrypt.compareSync(password, this.password);
    }
}
