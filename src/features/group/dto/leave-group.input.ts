import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LeaveGroupInput {
  @Field()
  group_id: string;
}
