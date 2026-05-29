import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  async register(data: any) {
    try {
      this.logger.log(`Registering user: ${data.email}`);
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          firstName: data.firstName,
          lastName: data.lastName,
        },
      });
      this.logger.log(`User created: ${user.id}`);
      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        message: 'User registered successfully'
      };
    } catch (error) {
      this.logger.error(`Registration failed: ${error.message}`);
      throw error;
    }
  }

  async login(data: any) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: data.email },
      });
      if (!user) {
        throw new Error('User not found');
      }
      
      const valid = await bcrypt.compare(data.password, user.password);
      if (!valid) {
        throw new Error('Invalid password');
      }

      return {
        accessToken: 'jwt-token',
        refreshToken: 'refresh-token',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        }
      };
    } catch (error) {
      this.logger.error(`Login failed: ${error.message}`);
      throw error;
    }
  }
}
