import { DataSource } from 'typeorm';
import DatabaseConstants from '../constants';
import { Book } from '../entities/book.entity';
import { People } from '../entities/people.entity';

export const repositoriesProvider = [
  {
    provide: DatabaseConstants.PEOPLE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(People),
    inject: [DatabaseConstants.DATA_ORM],
  },
  {
    provide: DatabaseConstants.BOOK_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Book),
    inject: [DatabaseConstants.DATA_ORM],
  },
];
