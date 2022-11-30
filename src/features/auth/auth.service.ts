import { Injectable, UnauthorizedException, Inject } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { RegisterInput } from "./dto/register.input";
import { LoginInput } from "./dto/login.input";
import { UserService } from "~features/user/user.service";
import { User } from "~features/user/entity/user.entity";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import type { Request, Response } from "~/share/types";
import { RedisService } from "~features/redis/redis.service";
import { CONFIG_KEY, COOKIES_KEY } from "~/constants/app.constants";
import { deleteFile } from "~/utils/firebase/firebase.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(RedisService)
    private readonly redisService: RedisService,
  ) {}

  async register(registerInput: RegisterInput): Promise<void> {
    const { username, password, email } = registerInput;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password.trim(), salt);
    await this.userService.createUser({
      username,
      password: hashPassword,
      email,
    });
  }

  setupJWTWithCookies(res: Response): string {
    const newAccessToken = this.jwtService.sign({
      isAuthenticated: true,
    });
    res.cookie(COOKIES_KEY.TOKEN, newAccessToken, {
      httpOnly: true,
      sameSite: true,
    });
    return newAccessToken;
  }

  async createNewSession(
    req: Request,
    res: Response,
    user_id: number,
    group_id?: string,
  ): Promise<void> {
    const newAccessToken = this.setupJWTWithCookies(res);
    req.session.user_id = user_id;
    if (group_id) req.session.default_group = group_id;
    req.session.expired_skip_time = 0;
    const expiredSeconds = this.configService.get(
      CONFIG_KEY.JWT_ACCESS_TOKEN_EXPIRE_SEC,
    );
    await this.redisService.set(req.session.id, newAccessToken, {
      ttl: expiredSeconds,
    });
  }

  async login(
    loginInput: LoginInput,
    req: Request,
    res: Response,
  ): Promise<User> {
    const { email, password } = loginInput;
    const user = (await this.userService.getUsersByFilters(
      { email: email },
      {
        multiResults: false,
      },
    )) as User;
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException("Please check your login credencials");
    }
    await this.createNewSession(req, res, user.id);
    return user;
  }

  async destroySession(
    req: Request,
    res: Response,
    options: { saveSession: boolean } = { saveSession: false },
  ): Promise<void> {
    const sessionId = req.session.id;
    await this.redisService.del(sessionId);
    res.clearCookie(COOKIES_KEY.TOKEN);
    const { saveSession } = options;
    !saveSession &&
      (await req.session.destroy((err) => {
        err &&
          console.log(
            "🚀 ~ file: jwt.stategy.ts ~ line 41 ~ JwtStrategy ~ req.session.destroy ~ err",
            err,
          );
      }));
  }

  async skipSession(req: Request, res: Response): Promise<boolean> {
    await this.destroySession(req, res, { saveSession: true });
    const expiredSkipTime = +this.configService.get(
      CONFIG_KEY.EXPIRED_SKIP_SESSION_MILI_SEC,
    );
    await req.session.regenerate((error) => {
      error &&
        console.log(
          "🚀 ~ file: auth.service.ts ~ line 100 ~ AuthService ~ awaitreq.session.regenerate ~ error",
          error,
        );
    });
    req.session.expired_skip_time = Date.now() + expiredSkipTime;
    req.session.cookie.maxAge = expiredSkipTime;
    return true;
  }

  async restartSession(req: Request, res: Response): Promise<User> {
    const expiredSkipTime = req.session.expired_skip_time;
    const user_id = req.session.user_id;
    const group_id = req.session.default_group;
    const user = (await this.userService.getUsersByFilters(
      { id: user_id },
      {
        multiResults: false,
      },
    )) as User;
    if (Date.now() > expiredSkipTime || !user) {
      throw new UnauthorizedException();
    }
    await this.createNewSession(req, res, user_id, group_id);
    return user;
  }

  async checkCurrentSession(req: Request, res: Response): Promise<User> {
    if (!req.session) {
      throw new UnauthorizedException();
    }
    const expiredSkipTime = req.session.expired_skip_time;
    const user_id = req.session.user_id;
    let user: User;
    if (!user_id) {
      throw new UnauthorizedException("User not valid");
    }
    if (expiredSkipTime) {
      user = await this.restartSession(req, res);
      return user;
    }
    user = (await this.userService.getUsersByFilters(
      { id: user_id },
      { multiResults: false },
    )) as User;
    return user;
  }

  async logout(req: Request, res: Response): Promise<boolean> {
    await this.destroySession(req, res);
    return true;
  }

  async deleteUser(req: Request, res: Response): Promise<boolean> {
    const result = await this.userService.deleteUser(req.session.user_id || 4);
    if (result?.id) {
      await deleteFile(result?.avatar);
      await this.logout(req, res);
      return true;
    }
    return false;
  }

  testAuthGuard(): string {
    return "asfsadfkdsfsadf";
  }
}
