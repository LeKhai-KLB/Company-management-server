import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { MaxLength, MinLength } from "class-validator";

@Entity()
export class Group {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @MinLength(2)
  @MaxLength(50)
  group_name: string;

  @Column({ nullable: true })
  @MaxLength(255)
  summary: string;

  @Column({ nullable: true })
  thumbnail: number;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn({ nullable: true })
  update_at: Date;
}
