import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/login.input";
import { RegisterInput } from "./dto/register.input";
import { Req, Res } from "~/share/decorators";
import type { Request, Response } from "~/share/types";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "./GqlAuthGuard";
import { UserInfoDto } from "~features/user/dto/user-info.dto";
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Boolean)
  async register(@Args("registerInput") registerInput: RegisterInput) {
    await this.authService.register(registerInput);
    return true;
  }

  @Query(() => UserInfoDto)
  login(
    @Args("loginInput") loginInput: LoginInput,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.authService.login(loginInput, req, res);
  }

  @Query(() => Boolean)
  @UseGuards(GqlAuthGuard)
  logout(@Req() req: Request, @Res() res: Response) {
    return this.authService.logout(req, res);
  }

  @Query(() => Boolean)
  @UseGuards(GqlAuthGuard)
  skipSession(@Req() req: Request, @Res() res: Response) {
    return this.authService.skipSession(req, res);
  }

  @Query(() => UserInfoDto, { nullable: true })
  checkCurrentSession(@Req() req: Request, @Res() res: Response) {
    return this.authService.checkCurrentSession(req, res);
  }

  @Query(() => String)
  @UseGuards(GqlAuthGuard)
  @Query(() => String)
  testAuthGuard() {
    return this.authService.testAuthGuard();
  }
}
