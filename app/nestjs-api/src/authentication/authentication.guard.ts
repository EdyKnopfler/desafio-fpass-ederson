import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { PUBLIC_ENDPOINT } from "./public.decorator";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicEndpoint = this.reflector.getAllAndOverride<boolean>(
      PUBLIC_ENDPOINT, [ context.getHandler(), context.getClass() ]);

    if (isPublicEndpoint) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    
    if (type != 'Bearer' || !token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token, { secret: process.env.JWT_SECRET });

      request.user = payload;
      console.log('LOGADO COMO USUÁRIO', payload)
      return true;
    } catch (e) {
      console.log(e)
      throw new UnauthorizedException();
    }
  }
}