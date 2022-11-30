import { Field, InputType } from "@nestjs/graphql";
import { MaxLength, MinLength } from "class-validator";

@InputType()
export class CreateNewSprintInput {
  @Field()
  @MinLength(2)
  @MaxLength(50)
  sprint_name: string;

  @Field()
  start_date?: Date;

  @Field()
  end_date?: Date;
}
