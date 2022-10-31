import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import { MaxLength } from "class-validator";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  @MaxLength(1000)
  content: string;

  @Column()
  room_id: string;

  @CreateDateColumn()
  create_at: Date;
}
