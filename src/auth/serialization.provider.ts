import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  serializeUser(user: any, done: CallableFunction) {
    done(null, user);
  }

  deserializeUser(payload: any, done: CallableFunction) {
    done(null, payload);
  }
}
