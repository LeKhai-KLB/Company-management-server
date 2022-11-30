import { Field, InputType } from "@nestjs/graphql";
import { TASK_TAG } from "~/constants/app.constants";

@InputType()
export class SetTagInput {
  @Field()
  task_id: number;

  @Field()
  tag: TASK_TAG;
}
