import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from "typeorm";
import { GROUP_ROLE } from "~/constants/app.constants";
import { User } from "~features/user/entity/user.entity";
import { Group } from "./group.entity";
@Entity()
@Unique(["user_id", "group_id"])
export class GroupMember extends BaseEntity {
  @PrimaryColumn()
  @ManyToOne(() => User, (user) => user.group_members, { onDelete: "CASCADE" })
  user_id: number;

  @PrimaryColumn()
  @ManyToOne(() => Group, (group) => group.group_members, {
    onDelete: "CASCADE",
  })
  group_id: string;

  @Column({
    default: `"${GROUP_ROLE.PENDING}"`,
  })
  role: GROUP_ROLE;
}
