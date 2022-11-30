import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, MaxLength, MinLength } from "class-validator";

@InputType()
export class UpdateUserInput {
  @Field()
  @MinLength(2)
  @MaxLength(30)
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MaxLength(500)
  introduction: string;

  @Field({ nullable: true })
  avatar?: string;
}
