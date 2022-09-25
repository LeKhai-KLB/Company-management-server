import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType("User")
export class RegisterOutput {
  @Field((type) => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  username: string;
}
