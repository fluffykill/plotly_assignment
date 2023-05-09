import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProductService } from '../product/product.service';

describe('UserService', () => {
  let service: UserService;

  const mockUsers = [
    {
      id: 1,
      name: "user1",
      age: 1,
      email: "user1@test.test",
      orderId: "1,2"
    },
    {
      id: 2,
      name: "user2",
      age: 2,
      email: "user2@test.test",
      orderId: "2"
    },
    {
      id: 3,
      name: "user3",
      age: 3,
      email: "user1@test.test",
      orderId: "3"
    }
  ]

  const mockUserRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(user => Promise.resolve({
      id: 4,
      ...user
    })),
    find: jest.fn().mockImplementation(() => Promise.resolve(mockUsers)),
    findOneByOrFail: jest.fn().mockImplementation((obj) => Promise.resolve(mockUsers.find(user => user.id === obj.id)))
  };

  const mockProducts = [
    {
      id: 1,
      name: "product1",
      price: 1.5
    },
    {
      id: 2,
      name: "product2",
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
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: ProductService,
          useValue: mockProductService,
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user record and return that', async () => {
    expect(await service.create({name: "test4", age: 4, email: "test4@test.test", orderId: "2"})).toEqual({
      id: expect.any(Number),
      name: "test4",
      age: 4,
      email: "test4@test.test",
      orderId: "2",
      order: [mockProducts[1]]
    })
  });

  it('should create a new user record with wrong order id and not return any products in order', async () => {
    expect(await service.create({name: "test5", age: 5, email: "test5@test.test", orderId: "5"})).toEqual({
      id: expect.any(Number),
      name: "test5",
      age: 5,
      email: "test5@test.test",
      orderId: "5",
      order: []
    })
  });

  it('should find the correct user with id 1 and return the correct orders of that user', async () => {
    expect(await service.findOne(1)).toEqual(
      expect.objectContaining({
        ...mockUsers[0],
        order: mockProducts
      })
    );
  })

  it('should return all users', async() => {
    expect(await service.findAll()).toEqual(
      mockUsers
    )
  });
});
