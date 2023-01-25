import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { repositoriesProvider } from './repositories/repositories.provider';
import { PeopleResolver } from './resolvers/people.resolver';
import { BookService } from './services/book.service';
import { PeopleService } from './services/people.service';

@Module({
  providers: [
    ...databaseProviders,
    ...repositoriesProvider,
    PeopleService,
    BookService,
    PeopleResolver,
  ],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
