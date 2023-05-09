import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

describe('ProductService', () => {
  let service: ProductService;

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

  const mockProductRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(product => Promise.resolve({
      id: 3,
      ...product
    })),
    find: jest.fn().mockImplementation(() => Promise.resolve(mockProducts)),
    findOneBy: jest.fn().mockImplementation((obj) => Promise.resolve(mockProducts.find(product => product.id === obj.id)))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        }
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new product record and return that', async () => {
    expect(await service.create({name: "test3", price: 3.5})).toEqual({
      id: expect.any(Number),
      name: "test3",
      price: 3.5
    })
  });

  it('should return one product with id 1', async () => {
    expect(await service.findOne(1)).toEqual(
      mockProducts[0]
    );
  })

  it('should return all products', async () => {
    expect(await service.findAll()).toEqual(
      mockProducts
    );
  })
});
