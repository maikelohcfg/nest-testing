import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import DatabaseConstants from '../constants';
import { Book } from '../entities/book.entity';
import { People } from '../entities/people.entity';

@Injectable()
export class BookService {
  constructor(
    @Inject(DatabaseConstants.BOOK_REPOSITORY)
    private bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findById(id: string): Promise<Book> {
    return this.bookRepository.findOneBy({
      id,
    });
  }

  async findAllByAuthor(author: People): Promise<Book[]> {
    return this.bookRepository.findBy({
      author,
    });
  }
}
