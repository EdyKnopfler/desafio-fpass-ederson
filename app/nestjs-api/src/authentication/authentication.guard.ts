import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
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
    if (this.isPublicEndpoint(context.getHandler(), context.getClass())) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const token = this.bearerTokenInHeader(request);
    const payload = await this.parseToken(token);
    
    request.user = payload;
    return true;
  }

  isPublicEndpoint(endpointHandler: Function, endpointClass: Type<any>): boolean {
    return this.reflector.getAllAndOverride<boolean>(
      PUBLIC_ENDPOINT, [ endpointHandler, endpointClass ]);
  }

  bearerTokenInHeader(request: any): string {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    
    if (type != 'Bearer' || !token) {
      throw new UnauthorizedException('No bearer token found');
    }

    return token;
  }

  async parseToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return payload;
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException(
        'Error when parsing authentication token: ' + e.message);
    }
  }
}