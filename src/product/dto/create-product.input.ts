import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String, { description: 'Product Name' })
  name: string;

  @Field(() => Float, { description: 'Product Price' })
  price: number;
}
