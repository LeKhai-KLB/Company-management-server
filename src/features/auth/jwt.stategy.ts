import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { COOKIES_KEY, CONFIG_KEY } from "~/constants/app.constants";
import { Request } from "~share/types";
import { UserService } from "~features/user/user.service";
import type { User } from "~features/user/entity/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      passReqToCallback: true,
      secretOrKey: configService.get(CONFIG_KEY.APP_SECRET_KEY),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies?.[COOKIES_KEY.TOKEN];
        },
      ]),
    });
  }

  async validate(req: Request) {
    const user = (await this.userService.getUsersByFilters(
      { id: req.session.user_id },
      { multiResults: false },
    )) as User;
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
