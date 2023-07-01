import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { AuthenticationGuard } from "./authentication.guard";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    })
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard
    }
  ],
})
export class AuthenticationModule {}