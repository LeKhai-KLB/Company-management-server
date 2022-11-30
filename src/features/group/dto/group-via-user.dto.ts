import { ObjectType, Field } from "@nestjs/graphql";
import { GROUP_ROLE } from "~/constants/app.constants";
import { GroupInfoDto } from "./group-info.dto";

@ObjectType("GroupViaUser")
export class GroupViaUserDto extends GroupInfoDto {
  @Field()
  role: GROUP_ROLE;

  @Field()
  isDefault?: boolean;
}
