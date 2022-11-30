import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { MaxLength } from "class-validator";
import { User } from "~/features/user/entity/user.entity";
import { Group } from "~/features/group/entity/group.entity";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ManyToOne(() => User, (user) => user.messages)
  user_id: number;

  @Column({ type: "text", length: 1000 })
  @MaxLength(1000)
  content: string;

  @Column()
  @ManyToOne(() => Group, (group) => group.messages)
  group_id: string;

  @CreateDateColumn()
  create_at: Date;
}
