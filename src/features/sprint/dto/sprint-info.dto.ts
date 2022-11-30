import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class SprintInfoDto {
  @Field({ nullable: true })
  id: number;

  @Field()
  sprint_name: string;

  @Field()
  start_date: Date;

  @Field()
  end_date?: Date;
}
