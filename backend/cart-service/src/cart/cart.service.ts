import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CartService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
  }

  async getCart(userId: string) {
    const cart = await this.redis.get(cart:);
    return cart ? JSON.parse(cart) : { items: [], total: 0 };
  }

  async addItem(userId: string, item: any) {
    const cart = await this.getCart(userId);
    cart.items.push(item);
cart.total += item.price * item.quantity;
    await this.redis.set(cart:, JSON.stringify(cart));
    return cart;
  }

  async clearCart(userId: string) {
    await this.redis.del(cart:);
    return { message: 'Cart cleared' };
  }
}
