import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectResolver } from "./project.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./entity/project.entity";
import { GroupModule } from "../group/group.module";

@Module({
  imports: [TypeOrmModule.forFeature([Project]), GroupModule],
  providers: [ProjectService, ProjectResolver],
  exports: [ProjectService],
})
export class ProjectModule {}
