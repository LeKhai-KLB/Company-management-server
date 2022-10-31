import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const Req = createParamDecorator((_, ctx: ExecutionContext) => {
  return GqlExecutionContext.create(ctx).getContext().req;
});
