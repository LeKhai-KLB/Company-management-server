import { ObjectType, Field } from "@nestjs/graphql";
import { GROUP_ROLE } from "~/constants/app.constants";

@ObjectType("MemberInGroupDto")
export class MemberInGroupDto {
  @Field({ nullable: true })
  id: number;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  role: GROUP_ROLE;
}
