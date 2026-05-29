import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async register(data: any) {
    return {
      id: 'user-1',
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      message: 'User registered successfully'
    };
  }

  async login(data: any) {
    return {
      accessToken: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token',
      user: {
        id: 'user-1',
        email: data.email
      }
    };
  }
}
