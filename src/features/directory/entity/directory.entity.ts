import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import { MaxLength, MinLength } from "class-validator";

@Entity()
export class Directory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(1)
  @MaxLength(1000)
  directory_name: string;

  @Column()
  @MaxLength(1000)
  data: string;

  @Column("int", { array: true })
  paths: number[];

  @Column({ nullable: true })
  parent: number;

  @Column({ nullable: true })
  group_id: string;

  @CreateDateColumn({ type: "timestamp" })
  upload_at: Date;
}
