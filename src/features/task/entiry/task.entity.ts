import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { MaxLength } from "class-validator";
import { TASK_TAG } from "~/constants/app.constants";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MaxLength(50)
  task_name: string;

  @Column()
  @MaxLength(2000)
  content: string;

  @Column({ type: "enum", enum: TASK_TAG, default: TASK_TAG.TODO })
  tag: TASK_TAG;

  @Column()
  point: number;

  @Column()
  sprint_id: number;

  @CreateDateColumn({ type: "timestamp" })
  create_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  update_at: Date;
}
