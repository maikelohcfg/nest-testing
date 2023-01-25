import {
  Resolver,
  Query,
  ResolveField,
  Args,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { NewPeopleInput } from '../dto/people/new-people.input';
import { People } from '../entities/people.entity';
import { BookService } from '../services/book.service';
import { PeopleService } from '../services/people.service';

@Resolver(() => People)
export class PeopleResolver {
  constructor(
    private peopleService: PeopleService,
    private bookService: BookService,
  ) {}

  @Query(() => [People])
  async peoples() {
    return this.peopleService.findAll();
  }

  @Query(() => People)
  async people(
    @Args('id', { type: () => String }) id: string,
    @Args('dateOfBirth', { type: () => String }) dateOfBirth: Date,
  ) {
    return this.peopleService.findOneById(id, dateOfBirth);
  }

  @ResolveField()
  async books(@Parent() people: People) {
    return this.bookService.findAllByAuthor(people);
  }

  @Mutation(() => People)
  async addPeople(@Args('newPeopleData') newPeopleData: NewPeopleInput) {
    return this.peopleService.create(newPeopleData);
  }
}
