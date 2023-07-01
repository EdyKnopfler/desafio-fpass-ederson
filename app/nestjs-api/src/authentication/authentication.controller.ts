import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from "@nestjs/common";
import { Public } from "./public.decorator";
import { JwtService } from "@nestjs/jwt";
import { LoginDTO } from "./authentication.logindto";

@Controller('auth')
export class AuthenticationController {
  constructor(
    private jwtService: JwtService
  ) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @Public()
  async signIn(@Body() userData: LoginDTO) {
    if (userData.username == 'user' && userData.password == 'password') {
      const token = await this.jwtService.signAsync({name: 'Kânia'});
      return { token };
    }

    throw new UnauthorizedException('Invalid login');
  }
}