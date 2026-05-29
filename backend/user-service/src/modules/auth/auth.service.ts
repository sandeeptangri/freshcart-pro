import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  async register(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      message: 'User registered successfully'
    };
  }

  async login(data: any) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) throw new Error('User not found');
    
    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new Error('Invalid password');

    return {
      accessToken: 'jwt-token-placeholder',
      refreshToken: 'refresh-token-placeholder',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }
    };
  }
}
