import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { GqlAuthGuard } from "../auth/GqlAuthGuard";
import { ProjectService } from "./project.service";
import { ProjectViaGroupDto } from "./dto/project-via-group.dto";
import { CreateNewProjectInput } from "./dto/create-new-project.input";
import { Request } from "~/share/types";
import { Req, RoleGuard } from "~/share/decorators";
import { GROUP_ROLE } from "~/constants/app.constants";
import { SetDefaultProjectInput } from "./dto/set-default-project.input";

@Resolver()
@UseGuards(GqlAuthGuard)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation(() => ProjectViaGroupDto, { nullable: true })
  @UseGuards(RoleGuard(GROUP_ROLE.ADMIN))
  async createNewProject(
    @Args("createNewProjectInput") createNewProjectInput: CreateNewProjectInput,
    @Req() req: Request,
  ) {
    console.log(req.session.default_group);
    const newProject = await this.projectService.createNewProject(
      req.session.default_group,
      createNewProjectInput,
    );
    req.session.default_project = newProject.id;
    return newProject;
  }

  @Query(() => [ProjectViaGroupDto])
  async getProjectList(@Req() req: Request) {
    const group_id = req.session.default_group;
    const projectList = await this.projectService.getProjectListViaGroupId(
      group_id,
    );
    return projectList.map((projectInfo) => {
      return {
        ...projectInfo,
        isDefault: req.session?.default_project === projectInfo.id,
      };
    });
  }

  @Mutation(() => ProjectViaGroupDto, { nullable: true })
  async setDefaultProject(
    @Args("setDefaultProjectInput")
    setDefaultProjectInput: SetDefaultProjectInput,
    @Req() req: Request,
  ) {
    const result = await this.projectService.getProjectById(
      setDefaultProjectInput.project_id,
    );
    if (!result) {
      return null;
    }
    req.session.default_project = result.id;
    return result;
  }
}
