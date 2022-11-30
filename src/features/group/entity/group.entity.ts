import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { MaxLength, MinLength } from "class-validator";
import { GroupMember } from "./group-member.entity";
import { RoomMember } from "~/features/room/entity/room-member.entity";
import { Message } from "~/features/message/entiry/message.entity";
import { Project } from "~/features/project/entity/project.entity";

@Entity()
export class Group {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "text",
    length: 50,
    default: "unknown",
  })
  @MinLength(2)
  @MaxLength(50)
  group_name: string;

  @Column({ type: "text", length: 500, nullable: true })
  @MaxLength(500)
  summary?: string;

  @CreateDateColumn()
  create_at: Date;

  @OneToMany(() => GroupMember, (groupMember) => groupMember.group_id)
  group_members: GroupMember[];

  @OneToMany(() => RoomMember, (roomMember) => roomMember.group_id, {
    onDelete: "CASCADE",
  })
  room_members: RoomMember[];

  @OneToMany(() => Message, (message) => message.user_id, {
    onDelete: "CASCADE",
  })
  messages: Message[];

  @OneToMany(() => Project, (project) => project.group_id, {
    onDelete: "CASCADE",
  })
  projects: Project[];
}
