import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class ProjectViaGroupDto {
  @Field({ nullable: true })
  id: string;

  @Field()
  project_name: string;

  @Field(() => String, { nullable: true })
  summary?: string;

  @Field()
  create_at: Date;

  @Field()
  isDefault?: boolean;
}
