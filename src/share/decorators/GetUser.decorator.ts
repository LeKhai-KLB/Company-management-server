import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "~/features/user/entity/user.entity";

export const GetUser = createParamDecorator(
  async (_, ctx: ExecutionContext) => {
    const user_id =
      GqlExecutionContext.create(ctx).getContext().req.session.user_id;
    if (!user_id) throw new UnauthorizedException("Not found current user!");
    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
      throw new UnauthorizedException("Not found current user!");
    }
    return user;
  },
);
