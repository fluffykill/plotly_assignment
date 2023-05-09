import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

describe('ProductResolver', () => {
  let resolver: ProductResolver;

  const mockProducts = [
    {
      id: 1,
      name: "test1",
      price: 1.5
    },
    {
      id: 2,
      name: "test2",
      price: 2.5
    }
  ]

  const mockProductService = {
    create: jest.fn().mockImplementation(dto => {return {
      id: 3,
      ...dto
    }}),
    findAll: jest.fn().mockImplementation(() => mockProducts),
    findOne: jest.fn().mockImplementation((id) => mockProducts.find(product => product.id === id)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductResolver, ProductService],
    })
    .overrideProvider(ProductService)
    .useValue(mockProductService)
    .compile();

    resolver = module.get<ProductResolver>(ProductResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a product', () => {
    expect(resolver.create({name: "test1", price: 1.5})).toEqual({
      id: expect.any(Number),
      name: "test1",
      price: 1.5
    });
  });

  it('should return one product with id 1', () => {
    expect(resolver.findOne(1)).toEqual(
      mockProducts[0]
    );
  })

  it('should return all products', () => {
    expect(resolver.findAll()).toEqual(
      mockProducts
    );
  })
});
