import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class JoinGroupInput {
  @Field()
  group_id: string;
}
