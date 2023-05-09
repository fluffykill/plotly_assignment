import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>, private productService:ProductService){}

  create(createUserInput: CreateUserInput):Promise<User> {
    const user = this.usersRepository.create(createUserInput);
    return this.usersRepository.save(user).then(async (user) => {
      const orders = user.orderId?.split(',').map((id) => {
        return this.productService.findOne(Number(id));
      });
      if (orders) {
        user.order = await Promise.all(orders);
        user.order = user.order.filter((order) => order !== null);
      }
      return user;
    });
  }

  async findAll():Promise<User[]> {
    return this.usersRepository.find().then(async (users) => {
      const returnUsers = users.map(async (user) => {
        const orders = user.orderId?.split(',').map((id) => {
          return this.productService.findOne(Number(id));
        });
        if (orders) {
          user.order = await Promise.all(orders);
          user.order = user.order.filter((order) => order !== null);
        }
        return user;
      })
      return await Promise.all(returnUsers);
    });
  }

  async findOne(id: number):Promise<User> {
    return this.usersRepository.findOneByOrFail({
      id: id,
    }).then(async (user) => {
      const orders = user.orderId?.split(',').map((id) => {
        return this.productService.findOne(Number(id));
      });
      if (orders) {
        user.order = await Promise.all(orders);
        user.order = user.order.filter((order) => order !== null);
      }
      return user;
    });
  }
}
