import { Injectable, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { ERROR_CODE } from "~/constants/app.constants";
import { execWithCatch } from "~/utils/execWithCatch";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  async createUser(userInfo: CreateUserDto) {
    const { username, email, password } = userInfo;
    const user = this.repository.create({
      username: username.trim(),
      email,
      password,
    });
    const [_, error] = await execWithCatch(
      async () => {
        await this.repository.save(user);
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
        userData = await this.repository.findOne({ where: filters });
      else userData = await this.repository.find({ where: filters });
    });
    return userData;
  }
}
