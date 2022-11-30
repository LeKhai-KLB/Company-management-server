import { Field, InputType } from "@nestjs/graphql";
import { GROUP_ROLE } from "~/constants/app.constants";

@InputType()
export class SetRoleInput {
  @Field()
  user_id: number;

  @Field()
  role: GROUP_ROLE;
}
