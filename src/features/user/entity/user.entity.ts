import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { GroupMember } from "~/features/group/entity/group-member.entity";
import { RoomMember } from "~/features/room/entity/room-member.entity";
import { Message } from "~/features/message/entiry/message.entity";
import { TaskMember } from "../../task/entiry/task-member.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ type: "text", length: 30, default: "unknown" })
  @MaxLength(30)
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true, type: "text", length: 500 })
  @MaxLength(500)
  introduction: string;

  @CreateDateColumn({ type: "timestamp" })
  create_at: Date;

  @OneToMany(() => GroupMember, (groupMember) => groupMember.user_id)
  group_members: GroupMember[];

  @OneToMany(() => RoomMember, (roomMember) => roomMember.group_id, {
    onDelete: "CASCADE",
  })
  room_members: RoomMember[];

  @OneToMany(() => Message, (message) => message.user_id, {
    onDelete: "CASCADE",
  })
  messages: Message[];

  @OneToMany(() => TaskMember, (taskMember) => taskMember.user_id, {
    onDelete: "CASCADE",
  })
  task_members: TaskMember[];
}
