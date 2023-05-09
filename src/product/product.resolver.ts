import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product, { name: 'createProduct' })
  create(@Args('createProductInput') createProductInput: CreateProductInput):Promise<Product> {
    return this.productService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'findAllProduct' })
  findAll():Promise<Product[]> {
    return this.productService.findAll();
  }

  @Query(() => Product, { name: 'findProduct' })
  findOne(@Args('id', { type: () => Int }) id: number):Promise<Product> {
    return this.productService.findOne(id);
  }
}
