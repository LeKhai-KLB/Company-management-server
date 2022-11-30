import { Field, InputType } from "@nestjs/graphql";
import { GROUP_ROLE } from "~/constants/app.constants";

@InputType()
export class GetMembersInGroupInput {
  @Field(() => [String])
  roles: GROUP_ROLE[];
}
