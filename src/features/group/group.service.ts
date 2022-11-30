import { Injectable } from "@nestjs/common";
import { Group } from "./entity/group.entity";
import { CreateNewGroupInput } from "./dto/create-new-group.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { execWithCatch } from "~/utils/execWithCatch";
import { GroupMember } from "./entity/group-member.entity";
import { GROUP_ROLE } from "~/constants/app.constants";
import { UserService } from "../user/user.service";
import { BadGatewayException } from "@nestjs/common/exceptions";
import { UpdateGroupInfoInput } from "./dto/update-group-info.Input";
import { User } from "../user/entity/user.entity";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(GroupMember)
    private readonly groupMemberRepository: Repository<GroupMember>,
    private readonly userService: UserService,
  ) {}

  async addGroupMember(
    group_id: string,
    user_id: number,
    role: GROUP_ROLE = GROUP_ROLE.PENDING,
  ): Promise<boolean> {
    const user = await this.userService.getUserById(user_id);
    if (!user) {
      throw new BadGatewayException("Not found user");
    }
    const newGroupMember = this.groupMemberRepository.create({
      group_id,
      user_id,
      role,
    });
    await execWithCatch(async () => {
      await this.groupMemberRepository.save(newGroupMember);
    });
    return true;
  }

  async addGroupMemberViaEmail(
    group_id: string,
    email: string,
    role: GROUP_ROLE = GROUP_ROLE.MEMBER,
  ): Promise<boolean> {
    const user = (await this.userService.getUsersByFilters(
      { email },
      { multiResults: false },
    )) as User;
    if (!user) {
      throw new BadGatewayException("Not found user");
    }
    const newGroupMember = this.groupMemberRepository.create({
      group_id,
      user_id: user.id,
      role,
    });
    await execWithCatch(async () => {
      await this.groupMemberRepository.save(newGroupMember);
    });
    return true;
  }

  async joinGroup(group_id: string, user_id: number) {
    return this.addGroupMember(group_id, user_id, GROUP_ROLE.PENDING);
  }

  async createNewGroup(
    user_id: number,
    createNewGroupInput: CreateNewGroupInput,
  ): Promise<Group> {
    const { group_name, summary } = createNewGroupInput;
    const newGroup = this.groupRepository.create({
      group_name,
      summary,
    });
    await execWithCatch(async () => {
      await this.groupRepository.save(newGroup);
    });
    await this.addGroupMember(newGroup.id, user_id, GROUP_ROLE.ADMIN);
    return newGroup;
  }

  async updateGroupInfo(
    group_id: string,
    updateGroupInfoInput: UpdateGroupInfoInput,
  ): Promise<Group> {
    const newGroup = await execWithCatch(() =>
      this.groupRepository
        .createQueryBuilder()
        .update(updateGroupInfoInput)
        .where({ id: group_id })
        .returning("*")
        .execute()
        .then((response) => response.raw[0]),
    );
    return newGroup[0];
  }

  async getGroupListViaUserId(
    user_id: number,
  ): Promise<Array<Group & { role: GROUP_ROLE }>> {
    const groupList = await execWithCatch(async () => {
      return this.groupRepository
        .createQueryBuilder("group")
        .innerJoinAndSelect(
          "group.group_members",
          "group_members",
          "group_members.user_id = :user_id",
          { user_id },
        )
        .select(["id", "group_name", "summary", "create_at"])
        .addSelect("group_members.role", "role")
        .execute();
    });
    return groupList[0];
  }

  async setRole(
    user_id: number,
    group_id: string,
    role: GROUP_ROLE,
  ): Promise<boolean> {
    const result = await execWithCatch(async () =>
      this.groupMemberRepository
        .createQueryBuilder()
        .update({ role })
        .where({ user_id, group_id })
        .returning("*")
        .execute()
        .then((response) => response.affected[0]),
    );
    return Number(result) !== 0;
  }

  async getGroupById(
    group_id: string,
    user_id: number,
  ): Promise<Group & { role: GROUP_ROLE }> {
    const groupList = await execWithCatch(async () => {
      return this.groupRepository
        .createQueryBuilder("group")
        .innerJoinAndSelect(
          "group.group_members",
          "group_members",
          "group_members.user_id = :user_id",
          { user_id },
        )
        .where("id = :group_id", { group_id })
        .select(["id", "group_name", "summary", "create_at"])
        .addSelect("group_members.role", "role")
        .execute();
    });
    return groupList[0][0];
  }

  async deleteGroup(group_id: string): Promise<boolean> {
    const result = await execWithCatch(() =>
      this.groupRepository
        .createQueryBuilder()
        .delete()
        .where({ id: group_id })
        .execute()
        .then((response) => response.affected[0]),
    );
    return Number(result) !== 0;
  }

  async leaveGroup(group_id: string, user_id): Promise<boolean> {
    const result = await execWithCatch(() =>
      this.groupMemberRepository
        .createQueryBuilder()
        .delete()
        .where({ group_id, user_id })
        .execute()
        .then((response) => response.affected[0]),
    );
    return Number(result) !== 0;
  }
}
