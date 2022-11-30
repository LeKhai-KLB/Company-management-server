import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AddGroupMemberViaEmailInput {
  @Field()
  email: string;
}
