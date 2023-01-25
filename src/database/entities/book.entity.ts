import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { People } from './people.entity';

@Entity({
  name: 'books',
  schema: 'public',
})
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => People, (people) => people.books, { cascade: true })
  author: People;
}
