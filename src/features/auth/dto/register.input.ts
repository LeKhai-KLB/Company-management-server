import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, Matches } from "class-validator";
import { usernameRegex, passwordRegex } from "~/utils/regex";

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Matches(usernameRegex)
  username: string;

  @Field()
  @Matches(passwordRegex)
  password: string;
}
