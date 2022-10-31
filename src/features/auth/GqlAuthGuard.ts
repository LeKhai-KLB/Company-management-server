import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Request, Response } from "~share/types";
import { AuthService } from "./auth.service";
import { COOKIES_KEY } from "~constants/app.constants";
import { RedisService } from "~features/redis/redis.service";

@Injectable()
export class GqlAuthGuard extends AuthGuard("jwt") {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(RedisService) private readonly redisService: RedisService,
  ) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req as Request;
    const res = ctx.getContext().res as Response;
    const sessionId = req.session.id;
    if (!sessionId) {
      throw new UnauthorizedException();
    }
    const isValidToken = await super.canActivate(context);
    if (!isValidToken) {
      throw new UnauthorizedException();
    }
    const tokenInCache = await this.redisService.get(sessionId);
    if (!tokenInCache) {
      await this.authService.createNewSession(req, res, req.session.user_id);
    } else if (tokenInCache !== req.cookies?.[COOKIES_KEY.TOKEN]) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
