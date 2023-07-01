import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { Public } from "./public.decorator";
import { JwtService } from "@nestjs/jwt";
import { LoginDTO } from "./authentication.logindto";
import { ZonedDateTime } from "@js-joda/core";

@Controller('auth')
export class AuthenticationController {
  constructor(
    private jwtService: JwtService
  ) {}

  @Post('signin')
  @Public()
  async signIn(@Body() userData: LoginDTO) {
    console.log(userData)
    if (userData.username == 'user' && userData.password == 'password') {
      //const expiration = ZonedDateTime.now().plusMi
      const token = await this.jwtService.signAsync({name: 'Kânia'});
      return { token };
    }

    throw new UnauthorizedException('Invalid login');
  }
}