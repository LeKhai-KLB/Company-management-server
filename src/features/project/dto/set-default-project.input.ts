import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SetDefaultProjectInput {
  @Field()
  project_id: string;
}
