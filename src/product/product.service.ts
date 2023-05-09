import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>){}

  create(createProductInput: CreateProductInput) {
    const product = this.productRepository.create(createProductInput);
    return this.productRepository.save(product);
  }

  async findAll():Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number):Promise<Product> {
    return this.productRepository.findOneBy({
      id: id,
    });
  }
}
