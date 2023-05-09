import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Product } from '../../product/entities/product.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'User Id' })
  id: number;

  @Column()
  @Field(() => String, { description: 'User Name' })
  name: string;

  @Column()
  @Field(() => String, { description: 'User Email' })
  email: string;

  @Column()
  @Field(() => Int, { description: 'User Age' })
  age: number;

  @Column({nullable: true})
  orderId: string;

  @Field(() => [Product], { description: 'User Orders', nullable: true })
  order: Product[];
}
