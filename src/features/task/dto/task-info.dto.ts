import { ObjectType, Field } from "@nestjs/graphql";
import { TASK_TAG } from "~/constants/app.constants";

@ObjectType()
class MemberDto {
  @Field()
  id: number;

  @Field()
  username: string;
}

@ObjectType()
export class TaskInfoDto {
  @Field({ nullable: true })
  id: number;

  @Field()
  task_name: string;

  @Field()
  content: string;

  @Field()
  point: number;

  @Field()
  tag: TASK_TAG;

  @Field(() => [MemberDto], { nullable: true })
  task_members?: Array<MemberDto>;
}
