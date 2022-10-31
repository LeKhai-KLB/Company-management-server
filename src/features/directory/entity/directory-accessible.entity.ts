import { Entity, PrimaryColumn, Unique } from "typeorm";

@Entity()
@Unique(["user_id", "directory_id"])
export class DirectoryAccessible {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  directory_id: number;
}
