import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}
  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }
  async createProduct(newProduct): Promise<ProductEntity> {
    return await this.productRepository.save(newProduct);
  }
  async updateProduct(product): Promise<ProductEntity> {
    return await this.productRepository.save(product);
  }
  async deleteProduct(id: number): Promise<DeleteResult> {
    return await this.productRepository.delete(id);
  }
}
