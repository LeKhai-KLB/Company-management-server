import { Field, InputType } from "@nestjs/graphql";
import { MaxLength, MinLength } from "class-validator";

@InputType()
export class CreateNewTaskInput {
  @Field()
  @MinLength(2)
  @MaxLength(50)
  task_name: string;

  @Field()
  @MaxLength(500)
  content?: string;

  @Field()
  point: number;

  @Field(() => [Number])
  task_members: Array<number>;

  @Field()
  sprint_id: number;
}
