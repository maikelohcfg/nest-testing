import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Field, Int, ID, ObjectType } from '@nestjs/graphql';
import { People } from './people.entity';

@Entity({
  name: 'books',
  schema: 'public',
})
@ObjectType()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @ManyToOne(() => People, (people) => people.books)
  @Field(() => People)
  author: People;
}
