import { UseGuards } from "@nestjs/common/decorators";
import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { GROUP_ROLE } from "~/constants/app.constants";
import { Req } from "~/share/decorators";
import { RoleGuard } from "~/share/decorators/RoleGuard.decorator";
import { Request } from "~/share/types";
import { GqlAuthGuard } from "../auth/GqlAuthGuard";
import { AddGroupMemberViaEmailInput } from "./dto/add-group-member-via-email.input";
import { CreateNewGroupInput } from "./dto/create-new-group.input";
import { DismissUserInput } from "./dto/dismiss-user.input.dto";
import { GroupViaUserDto } from "./dto/group-via-user.dto";
import { JoinGroupInput } from "./dto/join-group.input";
import { LeaveGroupInput } from "./dto/leave-group.input";
import { SetDefaultGroupInput } from "./dto/set-default-group.input";
import { SetRoleInput } from "./dto/set-role.input";
import { UpdateGroupInfoInput } from "./dto/update-group-info.Input";
import { GroupService } from "./group.service";

@Resolver()
@UseGuards(GqlAuthGuard)
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @Mutation(() => GroupViaUserDto, { nullable: true })
  async createNewGroup(
    @Args("createNewGroupInput") createNewGroupInput: CreateNewGroupInput,
    @Req() req: Request,
  ) {
    const user_id = req.session.user_id;
    const newGroup = await this.groupService.createNewGroup(
      user_id,
      createNewGroupInput,
    );
    req.session.default_group = newGroup.id;
    return {
      ...newGroup,
      role: GROUP_ROLE.ADMIN,
    };
  }

  @Mutation(() => GroupViaUserDto, { nullable: true })
  @UseGuards(RoleGuard(GROUP_ROLE.ADMIN))
  async updateGroupInfo(
    @Args("updateGroupInfoInput") updateGroupInfoInput: UpdateGroupInfoInput,
    @Req() req: Request,
  ) {
    const group_id = req.session.default_group;
    const group = await this.groupService.updateGroupInfo(
      group_id,
      updateGroupInfoInput,
    );
    if (!group) return;
    req.session.default_group = group.id;
    return {
      ...group,
      role: GROUP_ROLE.ADMIN,
    };
  }

  @Mutation(() => Boolean)
  @UseGuards(RoleGuard(GROUP_ROLE.ADMIN))
  async setRole(
    @Args("setRoleInput") setRoleInput: SetRoleInput,
    @Req() req: Request,
  ) {
    if (req.session.user_id === setRoleInput.user_id) return false;
    return await this.groupService.setRole(
      setRoleInput.user_id,
      req.session.default_group,
      setRoleInput.role,
    );
  }

  @Mutation(() => Boolean)
  async joinGroup(
    @Args("joinGroupInput") joinGroupInput: JoinGroupInput,
    @Req() req: Request,
  ) {
    return this.groupService.joinGroup(
      joinGroupInput.group_id,
      req.session.user_id,
    );
  }

  @Mutation(() => GroupViaUserDto, { nullable: true })
  async setDefaultGroup(
    @Args("setDefaultGroupInput") setDefaultGroupInput: SetDefaultGroupInput,
    @Req() req: Request,
  ) {
    const user_id = req.session.user_id;
    const result = await this.groupService.getGroupById(
      setDefaultGroupInput.group_id,
      user_id,
    );
    if (!result || result.role === GROUP_ROLE.PENDING) {
      return null;
    }
    req.session.default_group = result.id;
    return result;
  }

  @Mutation(() => Boolean)
  @UseGuards(RoleGuard(GROUP_ROLE.ADMIN))
  async deleteGroup(@Req() req: Request) {
    const result = await this.groupService.deleteGroup(
      req.session.default_group,
    );
    req.session.default_group = null;
    return result;
  }

  @Query(() => [GroupViaUserDto])
  async getGroupList(@Req() req: Request) {
    const user_id = req.session.user_id;
    const groupList = await this.groupService.getGroupListViaUserId(user_id);
    return groupList.map((groupInfo) => {
      return {
        ...groupInfo,
        isDefault: req.session?.default_group === groupInfo.id,
      };
    });
  }

  @Query(() => GroupViaUserDto, { nullable: true })
  async getDefaultGroup(@Req() req: Request) {
    const group_id = req.session.default_group;
    const user_id = req.session.user_id;
    if (!group_id) {
      return null;
    }
    return this.groupService.getGroupById(group_id, user_id);
  }

  @Mutation(() => Boolean)
  async leaveGroup(
    @Req() req: Request,
    @Args("leaveGroupInput") leaveGroupInput: LeaveGroupInput,
  ) {
    return this.groupService.leaveGroup(
      leaveGroupInput.group_id,
      req.session.user_id,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(RoleGuard(GROUP_ROLE.ADMIN))
  async dismissUser(
    @Req() req: Request,
    @Args("dismissUserInput") dismissUserInput: DismissUserInput,
  ) {
    return this.groupService.leaveGroup(
      req.session.default_group,
      dismissUserInput.user_id,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(RoleGuard(GROUP_ROLE.ADMIN))
  async addGroupMemberViaEmail(
    @Args("addGroupMemberViaEmailInput")
    addGroupMemberViaEmailInput: AddGroupMemberViaEmailInput,
    @Req() req: Request,
  ) {
    return this.groupService.addGroupMemberViaEmail(
      req.session.default_group,
      addGroupMemberViaEmailInput.email,
    );
  }
}
