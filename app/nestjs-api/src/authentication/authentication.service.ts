import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthenticationService {
  async validateToken(jwtToken: string): Promise<boolean> {
    return false;
  }
}