import { Injectable } from '@nestjs/common';
import { WebUser } from '../models/webUser';

@Injectable()
export class AuthService {
  private webUser: WebUser

  setSteamUser(user: any) {
    this.webUser = user;
  }

  getSteamUser() {
    return this.webUser;
  }
}
