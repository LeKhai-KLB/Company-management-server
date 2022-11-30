import { BadGatewayException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TASK_TAG } from "~/constants/app.constants";
import { execWithCatch } from "~/utils/execWithCatch";
import { User } from "../user/entity/user.entity";
import { UserService } from "../user/user.service";
import { CreateNewTaskInput } from "./dto/create-new-card.input";
import { TaskMember } from "./entiry/task-member.entity";
import { Task } from "./entiry/task.entity";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(TaskMember)
    private readonly taskMemberRepository: Repository<TaskMember>,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async asignTaskToMember(user_id: number, task_id: number): Promise<User> {
    const user = (await this.userService.getUsersByFilters(
      { id: user_id },
      { multiResults: false },
    )) as User;
    if (!user) {
      throw new BadGatewayException("Not found user");
    }
    const newGroupMember = this.taskMemberRepository.create({
      task_id,
      user_id,
    });
    await execWithCatch(async () => {
      await this.taskMemberRepository.save(newGroupMember);
    });
    return user;
  }

  async createNewTask(createNewTaskInput: CreateNewTaskInput) {
    const { task_name, content, point, task_members, sprint_id } =
      createNewTaskInput;
    const newSprint = await this.taskRepository.create({
      task_name,
      content,
      point,
      sprint_id,
    });
    await execWithCatch(async () => {
      await this.taskRepository.save(newSprint);
    });
    const userInfo = [];
    for (const id of task_members) {
      const user = await this.asignTaskToMember(id, newSprint.id);
      userInfo.push(user);
    }

    return {
      ...newSprint,
      task_members: [...userInfo],
    };
  }

  async setTag(task_id: number, tag: TASK_TAG) {
    const result = await execWithCatch(async () =>
      this.taskRepository
        .createQueryBuilder()
        .update({ tag })
        .where({ id: task_id })
        .returning("*")
        .execute()
        .then((response) => response.affected[0]),
    );
    return Number(result) !== 0;
  }

  async getAllTask(sprint_id: number): Promise<Array<Task>> {
    const projectList = await execWithCatch(async () => {
      return this.taskRepository
        .createQueryBuilder("task")
        .where("sprint_id = :sprint_id", { sprint_id })
        .select("*")
        .orderBy("id", "DESC")
        .execute();
    });
    return projectList[0];
  }
}
