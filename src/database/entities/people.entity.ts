import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { Field, Int, ID, ObjectType } from '@nestjs/graphql';
import { PartitionedTable } from '../decorators/PartitionedTable';
import { Book } from './book.entity';

@Entity({
  name: 'peoples',
  schema: 'general',
})
@ObjectType()
@PartitionedTable({
  tableName: 'peoples',
  schema: 'general',
})
export class People {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field(() => Int)
  age: number;

  @Column('date')
  @PrimaryColumn()
  @Field()
  dateOfBirth: Date;

  @OneToMany(() => Book, (book) => book.author, {
    cascade: true,
  })
  @Field(() => [Book])
  books: Book[];
}
