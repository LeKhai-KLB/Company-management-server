import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TaskResolver } from "./task.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entiry/task.entity";
import { SprintModule } from "../sprint/sprint.module";
import { TaskMember } from "./entiry/task-member.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskMember]),
    SprintModule,
    UserModule,
  ],
  providers: [TaskService, TaskResolver],
})
export class TaskModule {}
