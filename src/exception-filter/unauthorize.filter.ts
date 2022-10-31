import {
  Catch,
  ExceptionFilter,
  Inject,
  Injectable,
  UnauthorizedException,
  ArgumentsHost,
} from "@nestjs/common";
import { GqlArgumentsHost } from "@nestjs/graphql";
import { AuthService } from "~/features/auth/auth.service";
import { Response, Request } from "~share/types";
import {} from "@nestjs/common";

@Catch(UnauthorizedException)
@Injectable()
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  async catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const GqlContext = GqlArgumentsHost.create(host);
    const res = GqlContext.getContext().res as Response;
    const req = GqlContext.getContext().req as Request;
    await this.authService.destroySession(req, res);
    throw new UnauthorizedException(exception.message);
  }
}
