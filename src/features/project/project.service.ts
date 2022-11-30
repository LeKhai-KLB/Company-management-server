import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { execWithCatch } from "~/utils/execWithCatch";
import { CreateNewProjectInput } from "./dto/create-new-project.input";
import { Project } from "./entity/project.entity";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createNewProject(
    group_id: string,
    createNewProjectInput: CreateNewProjectInput,
  ): Promise<Project> {
    const { project_name, summary } = createNewProjectInput;
    const newProject = this.projectRepository.create({
      project_name,
      group_id,
      summary,
    });
    await execWithCatch(async () => {
      await this.projectRepository.save(newProject);
    });
    return newProject;
  }

  async getProjectListViaGroupId(group_id: string): Promise<Array<Project>> {
    const projectList = await execWithCatch(async () => {
      return this.projectRepository
        .createQueryBuilder("project")
        .where("group_id = :group_id", { group_id })
        .select(["id", "project_name", "summary", "create_at"])
        .execute();
    });
    return projectList[0];
  }

  async getProjectById(project_id: string): Promise<Project> {
    const groupList = await execWithCatch(async () => {
      return this.projectRepository
        .createQueryBuilder("project")
        .where("id = :project_id", { project_id })
        .select(["id", "project_name", "summary", "create_at"])
        .execute();
    });
    return groupList[0][0];
  }
}
