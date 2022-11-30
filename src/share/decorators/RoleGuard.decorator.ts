import { CanActivate, ExecutionContext, mixin, Type } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { GROUP_ROLE } from "~/constants/app.constants";
import { GroupMember } from "~/features/group/entity/group-member.entity";

export const RoleGuard = (role: GROUP_ROLE): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    async canActivate(ctx: ExecutionContext) {
      const user_id =
        GqlExecutionContext.create(ctx).getContext().req.session.user_id;
      const group_id =
        GqlExecutionContext.create(ctx).getContext().req.session.default_group;
      const member = await GroupMember.findOne({
        where: { user_id, group_id },
      });
      if (!member) return false;
      if (member.role !== GROUP_ROLE[role]) return false;
      return true;
    }
  }

  return mixin(RoleGuardMixin);
};
