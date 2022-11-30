import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "../project/entity/project.entity";
import { ProjectService } from "../project/project.service";
import { Sprint } from "./entity/sprint.entity";
import { CreateNewSprintInput } from "./dto/create-new-sprint.input";
import { execWithCatch } from "~/utils/execWithCatch";

@Injectable()
export class SprintService {
  constructor(
    @InjectRepository(Sprint)
    private readonly sprintRepository: Repository<Sprint>,
  ) {}

  async createNewSprint(
    project_id: string,
    createNewSprintInput: CreateNewSprintInput,
  ): Promise<Sprint> {
    const { sprint_name, start_date, end_date } = createNewSprintInput;
    const newSprint = await this.sprintRepository.create({
      sprint_name,
      start_date,
      end_date,
      project_id,
    });
    await execWithCatch(async () => {
      await this.sprintRepository.save(newSprint);
    });
    return newSprint;
  }

  async getAllSprint(project_id: string): Promise<Array<Sprint>> {
    const projectList = await execWithCatch(async () => {
      return this.sprintRepository
        .createQueryBuilder("sprint")
        .where("project_id = :project_id", { project_id })
        .orderBy("id", "DESC")
        .select(["id", "sprint_name", "start_date", "end_date"])
        .execute();
    });
    return projectList[0];
  }

  async getSprintById(sprint_id: number): Promise<Sprint> {
    const groupList = await execWithCatch(async () => {
      return this.sprintRepository
        .createQueryBuilder("sprint")
        .where("id = :sprint_id", { sprint_id })
        .select(["id", "sprint_name", "start_date", "end_date"])
        .execute();
    });
    return groupList[0][0];
  }
}
