import { Column, Entity, PrimaryColumn, Unique } from "typeorm";
import { GROUP_ROLE } from "~/constants/app.constants";

@Entity()
@Unique(["user_id", "group_id"])
export class GroupMember {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  group_id: string;

  @Column({ type: "enum", enum: GROUP_ROLE })
  role: GROUP_ROLE;
}
