import { InputType } from "@nestjs/graphql";
import { CreateUserDto } from "~features/user/dto/create-user.dto";

@InputType()
export class RegisterInput extends CreateUserDto {}
