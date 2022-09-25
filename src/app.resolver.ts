import { Resolver, Query, GqlExecutionContext } from "@nestjs/graphql";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

const GetRespone = createParamDecorator((_, ctx: ExecutionContext) => {
  return GqlExecutionContext.create(ctx).getContext().res;
});

const GetRequest = createParamDecorator((_, ctx: ExecutionContext) => {
  return GqlExecutionContext.create(ctx).getContext().req;
});

@Resolver()
export class FooResolver {
  @Query(() => String)
  sayHello(@GetRespone() res: any) {
    res.cookie("id", "1", {
      httpOnly: true,
      secure: true,
    });
    return "Hello world!";
  }
}
