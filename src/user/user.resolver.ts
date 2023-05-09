import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { name: 'createUser' })
  create(@Args('createUserInput') createUserInput: CreateUserInput):Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'findAllUser' })
  findAll():Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'findUser' })
  findOne(@Args('id', { type: () => Int }) id: number):Promise<User> {
    return this.userService.findOne(id);
  }
}
