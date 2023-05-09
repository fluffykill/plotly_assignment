import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  age: number;

  @Field({nullable:true})
  orderId?: string;
}