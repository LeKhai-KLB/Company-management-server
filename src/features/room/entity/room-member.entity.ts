import { Column, Entity, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { ROOM_ROLE } from "~/constants/app.constants";
import { User } from "~features/user/entity/user.entity";
import { Group } from "../../group/entity/group.entity";

@Entity()
@Unique(["user_id", "group_id"])
export class RoomMember {
  @PrimaryColumn()
  @ManyToOne(() => User, (user) => user.room_members)
  user_id: number;

  @PrimaryColumn()
  @ManyToOne(() => Group, (group) => group.room_members)
  group_id: string;
}
