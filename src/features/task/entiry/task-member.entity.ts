import { Entity, PrimaryColumn, Unique } from "typeorm";

@Entity()
@Unique(["user_id", "task_id"])
export class TaskMember {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  task_id: number;
}
