import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegisterInput } from "./dto/register.input";
import { User } from "./entity/user.entity";
import * as bcrypt from "bcrypt";
import { ERROR_CODE } from "~/constants/constants";
import { ConflictException } from "@nestjs/common";
import { InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async register(registerInput: RegisterInput): Promise<User> {
    const { username, password, email } = registerInput;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.repository.create({
      username,
      email,
      password: hashPassword,
    });

    try {
      await this.repository.save(user);
    } catch (error) {
      if (error.code === ERROR_CODE.DUPLICATED)
        throw new ConflictException("Email is already registered");
      else throw new InternalServerErrorException();
    }
    return user;
  }
}
