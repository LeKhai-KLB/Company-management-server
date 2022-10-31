import { Column, Entity, PrimaryColumn, Unique } from "typeorm";
import { ROOM_ROLE } from "~/constants/app.constants";

@Entity()
@Unique(["user_id", "group_id"])
export class RoomMember {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  group_id: string;

  @Column({ type: "enum", enum: ROOM_ROLE })
  role: ROOM_ROLE;
}
