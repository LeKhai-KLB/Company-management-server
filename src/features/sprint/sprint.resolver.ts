import { UseGuards } from "@nestjs/common";
import { Query, Args, Mutation, Resolver } from "@nestjs/graphql";
import { GROUP_ROLE } from "~/constants/app.constants";
import { Request } from "~/share/types";
import { Req, RoleGuard } from "~/share/decorators";
import { CreateNewSprintInput } from "./dto/create-new-sprint.input";
import { SprintInfoDto } from "./dto/sprint-info.dto";
import { SprintService } from "./sprint.service";
import { GetSprintInput } from "./dto/get-sprint.input";

@Resolver()
export class SprintResolver {
  constructor(private readonly sprintService: SprintService) {}

  @Mutation(() => SprintInfoDto, { nullable: true })
  @UseGuards(RoleGuard(GROUP_ROLE.ADMIN))
  async createNewSprint(
    @Args("createNewSprintInput") createNewSprintInput: CreateNewSprintInput,
    @Req() req: Request,
  ) {
    return await this.sprintService.createNewSprint(
      req.session.default_project,
      createNewSprintInput,
    );
  }

  @Query(() => [SprintInfoDto], { nullable: true })
  async getAllSprint(@Req() req: Request) {
    return await this.sprintService.getAllSprint(req.session.default_project);
  }

  @Mutation(() => SprintInfoDto, { nullable: true })
  async getSprintById(@Args("getSprintInput") getSprintInput: GetSprintInput) {
    return await this.sprintService.getSprintById(getSprintInput.sprint_id);
  }
}
