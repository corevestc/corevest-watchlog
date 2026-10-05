import { Body, Controller, Get, HttpCode, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { GetCurrentUser } from "../../../application/user/get-current-user.js";
import { LoginUser } from "../../../application/user/login-user.js";
import { RegisterUser } from "../../../application/user/register-user.js";
import { authCredentialsSchema } from "../dto/auth-dto.js";
import { AuthGuard, type AuthedRequest } from "../guards/auth.guard.js";
import { parseDto } from "../parse-dto.js";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject(RegisterUser) private readonly registerUser: RegisterUser,
    @Inject(LoginUser) private readonly loginUser: LoginUser,
    @Inject(GetCurrentUser) private readonly currentUser: GetCurrentUser
  ) {}

  @Post("register")
  async register(@Body() body: unknown) {
    const credentials = parseDto(authCredentialsSchema, body);
    const data = await this.registerUser.execute(credentials);
    return { data };
  }

  @Post("login")
  @HttpCode(200)
  async login(@Body() body: unknown) {
    const credentials = parseDto(authCredentialsSchema, body);
    const data = await this.loginUser.execute(credentials);
    return { data };
  }

  @Get("me")
  @UseGuards(AuthGuard)
  async me(@Req() req: AuthedRequest) {
    const data = await this.currentUser.execute(req.user.id);
    return { data };
  }
}
