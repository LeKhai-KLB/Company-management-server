import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetSprintInput {
  @Field()
  sprint_id: number;
}
