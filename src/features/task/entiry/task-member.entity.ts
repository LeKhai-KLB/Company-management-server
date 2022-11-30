import { Entity, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { User } from "~/features/user/entity/user.entity";
import { Task } from "./task.entity";

@Entity()
@Unique(["user_id", "task_id"])
export class TaskMember {
  @PrimaryColumn()
  @ManyToOne(() => User, (user) => user.task_members)
  user_id: number;

  @PrimaryColumn()
  @ManyToOne(() => Task, (task) => task.task_members)
  task_id: number;
}
