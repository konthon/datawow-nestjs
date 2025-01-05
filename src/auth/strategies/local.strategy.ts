import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';
import { AuthType } from '../type';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, AuthType.local) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'username', passwordField: 'password' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validate(username: string, _password) {
    return await this.authService.validateUser(username);
  }
}
