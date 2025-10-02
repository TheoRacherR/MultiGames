export enum country {
  FRANCE = '🇫🇷',
  USA = '🇺🇸',
  UK = '🇬🇧',
}

export enum userRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface UserFormated {
  id: string;
  email: string;
  pseudo: string;
  country: country;
  created_at: Date;
  role: userRole;
}
export interface UserProfile {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  pseudo: string;
  country: country;
  role: userRole;
  created_at: Date;
  updated_at: Date;
}

export interface UserWithPassword {
  id: string;
  email: string;
  password: string;
  role: userRole;
}
