import { WebUser } from 'src/auth/models/webUser';

declare global {
  namespace Express {
    interface User extends WebUser {}
  }
}
