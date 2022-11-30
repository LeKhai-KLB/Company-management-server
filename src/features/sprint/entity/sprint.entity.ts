import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MaxLength } from "class-validator";
import { Project } from "~/features/project/entity/project.entity";
import { Task } from "~/features/task/entiry/task.entity";

@Entity()
export class Sprint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", length: 50 })
  @MaxLength(50)
  sprint_name: string;

  @Column()
  @ManyToOne(() => Project, (project) => project.sprints)
  project_id: string;

  @CreateDateColumn({ type: "timestamp" })
  start_date: Date;

  @Column({ type: "timestamp", nullable: true })
  end_date?: Date;

  @OneToMany(() => Task, (task) => task.sprint_id, {
    onDelete: "CASCADE",
  })
  tasks: Task[];
}
