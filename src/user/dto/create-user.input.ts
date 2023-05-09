import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {

  @Field(() => String, { description: 'User Name' })
  name: string;


  @Field(() => String, { description: 'User Email' })
  email: string;


  @Field(() => Int, { description: 'User Age' })
  age: number;

  @Field({nullable:true})
  orderId?: string;
}
