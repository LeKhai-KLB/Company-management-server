import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { MaxLength, MinLength } from "class-validator";
import { Group } from "~/features/group/entity/group.entity";
import { Sprint } from "~/features/sprint/entity/sprint.entity";

@Entity()
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "text",
    length: 50,
  })
  @MinLength(2)
  @MaxLength(50)
  project_name: string;

  @Column({ nullable: true, type: "text", length: 255 })
  @MaxLength(255)
  summary: string;

  @Column()
  @ManyToOne(() => Group, (group) => group.projects, { onDelete: "CASCADE" })
  group_id: string;

  @CreateDateColumn()
  create_at: Date;

  @Column({ nullable: true })
  done_at: Date;

  @OneToMany(() => Sprint, (sprint) => sprint.project_id, {
    onDelete: "CASCADE",
  })
  sprints: Sprint[];
}
