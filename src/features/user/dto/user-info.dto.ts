import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType("User")
export class UserInfoDto {
  @Field({ nullable: true })
  id?: number;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field((type) => String, { nullable: true })
  avatar?: string;

  @Field((type) => String, { nullable: true })
  introduction?: string;

  @Field()
  create_at: Date;
}
