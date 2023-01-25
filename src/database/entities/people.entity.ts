import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { PartitionedTable } from '../decorators/PartitionedTable';
import { Book } from './book.entity';

@Entity({
  name: 'peoples',
  schema: 'general',
})
@PartitionedTable({
  tableName: 'peoples',
  schema: 'general',
})
export class People {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column('date')
  @PrimaryColumn()
  dateOfBirth: Date;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
