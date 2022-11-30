import { Field, InputType } from "@nestjs/graphql";
import { MaxLength, MinLength } from "class-validator";

@InputType()
export class CreateNewProjectInput {
  @Field()
  @MinLength(2)
  @MaxLength(50)
  project_name: string;

  @Field(() => String, { nullable: true })
  summary?: string;
}
