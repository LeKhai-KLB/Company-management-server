import { Field, InputType } from "@nestjs/graphql";
import { MaxLength, MinLength } from "class-validator";

@InputType()
export class UpdateGroupInfoInput {
  @Field()
  @MinLength(2)
  @MaxLength(50)
  group_name: string;

  @Field(() => String, { nullable: true })
  summary?: string;
}
