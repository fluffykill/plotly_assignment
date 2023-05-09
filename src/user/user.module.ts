import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ProductModule],
  providers: [UserResolver, UserService]
})
export class UserModule {}
