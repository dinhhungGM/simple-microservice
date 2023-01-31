import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @EventPattern('hello')
  async hello(data: any) {
    console.log(data);
  }

  @EventPattern('product_created')
  async productCreatedEvent(product: any) {
    console.log(product);
    await this.productService.create({
      id: product.id,
      name: product.name,
      image: product.image,
      likes: product.likes,
    });
  }
}
