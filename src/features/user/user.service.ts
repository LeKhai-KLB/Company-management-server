import { Injectable, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { ERROR_CODE, GROUP_ROLE } from "~/constants/app.constants";
import { execWithCatch } from "~/utils/execWithCatch";
import { UpdateUserInput } from "./dto/update-user.input";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userInfo: CreateUserDto) {
    const { username, email, password } = userInfo;
    const user = this.userRepository.create({
      username: username.trim(),
      email,
      password,
    });
    const [, error] = await execWithCatch(
      async () => {
        await this.userRepository.save(user);
      },
      { pick: [ERROR_CODE.DUPLICATED] },
    );
    if (error) throw new ConflictException("Email is already registered");
    return user;
  }

  async getUsersByFilters(
    filters: Record<string, any>,
    options = { multiResults: true },
  ): Promise<User | User[]> {
    const { multiResults } = options;
    let userData: User | User[];
    await execWithCatch(async () => {
      if (!multiResults)
        userData = await this.userRepository.findOne({ where: filters });
      else userData = await this.userRepository.find({ where: filters });
    });
    return userData;
  }

  async updateUserInfo(
    id: number,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const newUserInfo = await execWithCatch(() =>
      this.userRepository
        .createQueryBuilder()
        .update(updateUserInput)
        .where({ id })
        .returning("*")
        .execute()
        .then((response) => response.raw[0]),
    );
    return newUserInfo[0];
  }

  async deleteUser(id: number): Promise<Pick<User, "id" | "avatar">> {
    const result = await execWithCatch(() =>
      this.userRepository
        .createQueryBuilder()
        .delete()
        .where({ id })
        .returning(["id", "avatar"])
        .execute()
        .then((response) => response.raw[0]),
    );
    return result[0];
  }

  async getUserById(id: number): Promise<User> {
    const result = (await this.getUsersByFilters(
      { id },
      { multiResults: false },
    )) as User;
    return result;
  }

  async getMembersInGroup(
    group_id: string,
    roles: GROUP_ROLE[],
  ): Promise<User & { role: GROUP_ROLE }> {
    const result = await execWithCatch(async () => {
      return await this.userRepository
        .createQueryBuilder("user")
        .innerJoinAndSelect(
          "user.group_members",
          "group_members",
          "group_members.group_id = :group_id",
          { group_id },
        )
        .where("group_members.role IN(:...roles)", { roles })
        .select(["id", "email", "username"])
        .addSelect("group_members.role", "role")
        .execute();
    });
    return result[0];
  }
}
