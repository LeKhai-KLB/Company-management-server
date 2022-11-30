import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetAllTaskInput {
  @Field()
  sprint_id: number;
}
