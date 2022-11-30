import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType("UserInfoDto")
export class UserInfoDto {
  @Field({ nullable: true })
  id: number;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => String, { nullable: true })
  introduction?: string;

  @Field()
  create_at: Date;
}
