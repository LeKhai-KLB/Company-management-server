import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DismissUserInput {
  @Field()
  user_id: number;
}
