import { Module } from "@nestjs/common";
import { SprintService } from "./sprint.service";
import { SprintResolver } from "./sprint.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sprint } from "./entity/sprint.entity";
import { ProjectModule } from "../project/project.module";

@Module({
  imports: [TypeOrmModule.forFeature([Sprint]), ProjectModule],
  providers: [SprintService, SprintResolver],
  exports: [SprintService],
})
export class SprintModule {}
