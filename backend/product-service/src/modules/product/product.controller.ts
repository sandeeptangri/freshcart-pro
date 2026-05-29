import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get('featured')
  async findFeatured() {
    return this.productService.findFeatured();
  }

  @Get('categories')
  async getCategories() {
    return this.productService.getCategories();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findById(id);
  }
}
