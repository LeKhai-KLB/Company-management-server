import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Req } from "~/share/decorators";
import { Request } from "~share/types";
import { GqlAuthGuard } from "../auth/GqlAuthGuard";
import { GetMembersInGroupInput } from "./dto/get-members-in-group.input";
import { MemberInGroupDto } from "./dto/member-in-group.dto";
import { UpdateUserInput } from "./dto/update-user.input";
import { UserInfoDto } from "./dto/user-info.dto";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserInfoDto)
  @UseGuards(GqlAuthGuard)
  updateUserInfo(
    @Req() req: Request,
    @Args("updateUserInput") updateUserInput: UpdateUserInput,
  ) {
    return this.userService.updateUserInfo(
      req.session.user_id,
      updateUserInput,
    );
  }

  @Query(() => [MemberInGroupDto])
  // @UseGuards(GqlAuthGuard)
  getMembersInGroup(
    @Args("getMembersInGroupInput")
    getMembersInGroupInput: GetMembersInGroupInput,
    @Req() req: Request,
  ) {
    return this.userService.getMembersInGroup(
      req.session.default_group,
      getMembersInGroupInput.roles,
    );
  }
}
