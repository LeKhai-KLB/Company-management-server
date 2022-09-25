import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { RegisterInput } from "./dto/register.input";
import { RegisterOutput } from "./dto/register.output";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegisterOutput)
  register(@Args("RegisterInput") registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }
}
