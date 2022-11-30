import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, Matches, MaxLength, MinLength } from "class-validator";
import { passwordRegex } from "~/utils/regex";

@InputType()
export class CreateUserDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(2)
  @MaxLength(30)
  username: string;

  @Field()
  @Matches(passwordRegex, {
    message:
      "Password must have length with 6 to 20, at least 1 lower, upper case, number and special characters",
  })
  password: string;

  @Field(() => String, { nullable: true })
  avatar?: string;
}
