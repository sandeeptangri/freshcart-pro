import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CartService implements OnModuleInit {
  private redis: Redis | null = null;
  private memoryStore = new Map<string, any>();

  onModuleInit() {
    const redisUrl = process.env.REDIS_URL;
    if (redisUrl) {
      try {
        this.redis = new Redis(redisUrl);
        console.log('Connected to Redis');
      } catch (err: any) {
        console.warn('Redis failed, using memory:', err.message);
      }
    } else {
      console.log('REDIS_URL not set, using in-memory store');
    }
  }

  async getCart(userId: string) {
    const key = 'cart:' + userId;
    if (this.redis) {
      const cart = await this.redis.get(key);
      return cart ? JSON.parse(cart) : { items: [], total: 0 };
    }
    return this.memoryStore.get(key) || { items: [], total: 0 };
  }

  async addItem(userId: string, item: any) {
    const cart = await this.getCart(userId);
    cart.items.push(item);
    cart.total += (item.price || 0) * (item.quantity || 1);
    const key = 'cart:' + userId;
    if (this.redis) {
      await this.redis.set(key, JSON.stringify(cart));
    } else {
      this.memoryStore.set(key, cart);
    }
    return cart;
  }

  async clearCart(userId: string) {
    const key = 'cart:' + userId;
    if (this.redis) await this.redis.del(key);
    else this.memoryStore.delete(key);
    return { message: 'Cart cleared' };
  }
}
