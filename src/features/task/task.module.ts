import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';

@Module({
  providers: [TaskService, TaskResolver]
})
export class TaskModule {}
