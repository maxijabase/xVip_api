import {
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(
    err: any,
    user: any,
    info: { message?: string },
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest();
    const isAuthPath = request.path.includes('/auth/');

    if ((err || !user) && !isAuthPath) {
      console.log('JWT validation failed:', info?.message);
      throw new UnauthorizedException();
    } else if (user) {
      console.log('JWT validation success:', user.steamid, user.personaname);
    }
    return user;
  }
}
