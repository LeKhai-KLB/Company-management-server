import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, Matches } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  isActive: boolean;
}
