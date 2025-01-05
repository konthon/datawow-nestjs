import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string) {
    let user = await this.usersService.getUserByUsername(username);
    if (!user) {
      user = await this.usersService.createUser({ username });
    }
    return user;
  }
}
