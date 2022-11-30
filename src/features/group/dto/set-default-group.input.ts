import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SetDefaultGroupInput {
  @Field()
  group_id: string;
}
