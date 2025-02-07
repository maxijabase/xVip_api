export interface SteamUser {
  id: string;
  displayName: string;
  profileUrl: string;
  avatars: {
    small: string;
    medium: string;
    large: string;
  };
  countryCode: string;
  created: Date;
  lastLogoff: Date;
}

export type SteamAvatarSize = 'small' | 'medium' | 'large';
export type PersonaState = 0 | 1 | 2 | 3 | 4 | 5 | 6;