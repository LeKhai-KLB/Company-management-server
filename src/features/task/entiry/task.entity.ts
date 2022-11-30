import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { MaxLength } from "class-validator";
import { TASK_TAG } from "~/constants/app.constants";
import { Sprint } from "~/features/sprint/entity/sprint.entity";
import { TaskMember } from "./task-member.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", length: 50 })
  @MaxLength(50)
  task_name: string;

  @Column({ type: "text", length: 2000 })
  @MaxLength(2000)
  content: string;

  @Column({ default: TASK_TAG.TODO })
  tag: TASK_TAG;

  @Column()
  point: number;

  @CreateDateColumn({ type: "timestamp" })
  create_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  update_at: Date;

  @Column()
  @ManyToOne(() => Sprint, (sprint) => sprint.tasks)
  sprint_id: number;

  @OneToMany(() => TaskMember, (taskMember) => taskMember.task_id, {
    onDelete: "CASCADE",
  })
  task_members: TaskMember[];
}
