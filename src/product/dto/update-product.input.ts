import { CreateProductInput } from './create-product.input';
import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => String, { description: 'Product Name' })
  name: string;

  @Field(() => Float, { description: 'Product Price' })
  price: number;
}
