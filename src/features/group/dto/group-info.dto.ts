import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType("GroupInfoDto")
export class GroupInfoDto {
  @Field({ nullable: true })
  id?: string;

  @Field()
  group_name: string;

  @Field(() => String, { nullable: true })
  summary?: string;

  @Field()
  create_at: Date;
}
