import { Field, InputType, Int } from '@nestjs/graphql';
import { NewBookInput } from '../book/new-book-people.input';

@InputType()
export class NewPeopleInput {
  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field()
  dateOfBirth: Date;

  @Field(() => [NewBookInput])
  books: NewBookInput[];
}
