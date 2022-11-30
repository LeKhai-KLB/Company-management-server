import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TaskService } from "./task.service";
import { TaskInfoDto } from "./dto/task-info.dto";
import { CreateNewTaskInput } from "./dto/create-new-card.input";
import { GetAllTaskInput } from "./dto/get-all-task.input";
import { SetTagInput } from "./dto/set-tag.input";

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => TaskInfoDto, { nullable: true })
  async createNewTask(
    @Args("createNewTaskInput") createNewTaskInput: CreateNewTaskInput,
  ) {
    return await this.taskService.createNewTask(createNewTaskInput);
  }

  @Query(() => [TaskInfoDto], { nullable: true })
  async getAllTask(@Args("getAllTaskInput") getAllTaskInput: GetAllTaskInput) {
    return await this.taskService.getAllTask(getAllTaskInput.sprint_id);
  }

  @Mutation(() => Boolean)
  async setTag(@Args("setTagInput") setTagInput: SetTagInput) {
    return await this.taskService.setTag(setTagInput.task_id, setTagInput.tag);
  }
}
