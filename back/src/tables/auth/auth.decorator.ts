import { SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { userRole } from 'src/@types/tables/user';

export const AuthenticationRequired = () => UseGuards(AuthGuard);

export const HasRole = (role: userRole) => SetMetadata('role', role);
