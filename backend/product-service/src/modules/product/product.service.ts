import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ProductService {
  async findAll() {
    return prisma.product.findMany({
      include: { category: true }
    });
  }

  async findFeatured() {
    return prisma.product.findMany({
      where: { featured: true },
      include: { category: true },
      take: 8
    });
  }

  async findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: { category: true }
    });
  }

  async findByCategory(categorySlug: string) {
    return prisma.product.findMany({
      where: { category: { slug: categorySlug } },
      include: { category: true }
    });
  }

  async getCategories() {
    return prisma.category.findMany({
      include: { _count: { select: { products: true } } }
    });
  }
}
