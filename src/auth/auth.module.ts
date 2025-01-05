import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UsersService } from 'src/users/users.service';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthSerializer } from './serialization.provider';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [PassportModule.register({ session: true })],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    AuthSerializer,

    UsersService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
