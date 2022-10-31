import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MaxLength } from "class-validator";

@Entity()
export class Sprint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MaxLength(50)
  sprint_name: string;

  @Column()
  project_id: string;

  @Column({ type: "timestamp" })
  start_date: Date;

  @Column({ type: "timestamp" })
  end_date: Date;
}
