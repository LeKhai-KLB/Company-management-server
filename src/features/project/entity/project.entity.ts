import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import { MaxLength, MinLength } from "class-validator";

@Entity()
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @MinLength(2)
  @MaxLength(50)
  project_name: string;

  @Column({ nullable: true })
  @MaxLength(255)
  summary: string;

  @Column()
  group_id: string;

  @CreateDateColumn()
  create_at: Date;

  @Column({ nullable: true })
  done_at: Date;
}
