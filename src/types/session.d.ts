import { WebUser } from 'src/auth/models/webUser';

declare module 'express-session' {
  interface SessionData {
    user: WebUser | null;
  }
}
