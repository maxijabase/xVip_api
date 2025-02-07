import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AppService {
  getHello(req: Request): string {
    let user = req.session.user;
    return user ? `Hello ${user.personaname}, ${user.steamid}!` : `Not authenticated`;
  }
}
