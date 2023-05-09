import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;

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
  
  const mockUserService = {
    create: jest.fn().mockImplementation(dto => {return {
      id: 3,
      ...dto
    }}),
    findAll: jest.fn().mockImplementation(() => mockUsers),
    findOne: jest.fn().mockImplementation((id) => mockUsers.find(user => user.id === id)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService],
    })
    .overrideProvider(UserService)
    .useValue(mockUserService)
    .compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a user', () => {
    expect(resolver.create({name: "test4", age: 4, email: "test4@test.test", orderId: "2"})).toEqual({
      id: expect.any(Number),
      name: "test4",
      age: 4,
      email: "test4@test.test",
      orderId: "2"
    });
  });

  it('should return one product with id 1', () => {
    expect(resolver.findOne(1)).toEqual(
    mockUsers[0]
    );
  })

  it('should return all products', () => {
    expect(resolver.findAll()).toEqual(
      mockUsers
    );
  })
});
