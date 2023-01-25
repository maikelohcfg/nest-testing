import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import DatabaseConstants from '../constants';
import { NewPeopleInput } from '../dto/people/new-people.input';
import { People } from '../entities/people.entity';

@Injectable()
export class PeopleService {
  constructor(
    @Inject(DatabaseConstants.PEOPLE_REPOSITORY)
    private peopleRepository: Repository<People>,
  ) {}

  async findAll(): Promise<People[]> {
    return this.peopleRepository.find();
  }

  async findOneById(id: string, dateOfBirth: Date): Promise<People> {
    return this.peopleRepository.findOneBy({
      id,
      dateOfBirth,
    });
  }

  async create(dto: NewPeopleInput): Promise<People> {
    return this.peopleRepository.save(dto);
  }
}
