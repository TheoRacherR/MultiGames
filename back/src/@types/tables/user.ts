export enum country {
  FRANCE = 'FRANCE',
  USA = 'USA',
  UK = 'UK',
}

export enum userRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface UserInfos {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  pseudo: string;
  role: userRole;
  country: country;
}

export interface UserFormated {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  pseudo: string;
  country: country;
  role: userRole;
  created_at: Date;
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
