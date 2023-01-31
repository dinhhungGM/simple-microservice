import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}
  @Get()
  async getAllProducts() {
    this.client.emit('hello', 'Hello from admin');
    return await this.productService.getAllProducts();
  }

  @Post()
  async createProduct(
    @Body('name') name: string,
    @Body('image') image: string,
  ) {
    const product = await this.productService.createProduct({
      name,
      image,
    });
    this.client.emit('product_created', product);
    return product;
  }

  @Put()
  async updateProduct(
    @Body('id') id: number,
    @Body('name') name: string,
    @Body('image') image: string,
  ) {
    const product = await this.productService.updateProduct({
      id,
      name,
      image,
    });
    this.client.emit('product_updated', product);
    return product;
  }

  @Delete()
  async deleteProduct(@Param() id: number) {
    await this.productService.deleteProduct(id);
    this.client.emit('product_deleted', id);
  }
}
