import { ObjectType, Field, Float, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'Product Id' })
  id: number;

  @Column()
  @Field(() => String, { description: 'Product Name' })
  name: string;

  @Column({type: "float"})
  @Field(() => Float, { description: 'Product Price' })
  price: number;
}
