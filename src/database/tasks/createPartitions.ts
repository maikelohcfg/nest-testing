import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DateTime } from 'luxon';
import { DataSource } from 'typeorm';
import DatabaseConstants from '../constants';
import {
  registeredPartitionedTables,
  PartitionedTableOptions,
} from '../decorators/PartitionedTable';

@Injectable()
export class CreatePartitionTask {
  private readonly logger = new Logger(CreatePartitionTask.name);

  constructor(
    @Inject(DatabaseConstants.DATA_ORM)
    private orm: DataSource,
  ) {}

  @Cron('1 1 30 11 *')
  handleCron() {
    this.logger.debug('Calling CreatePartitionTask');
    for (const key of Object.keys(registeredPartitionedTables)) {
      this.logger.log(`Generating partitions for table: ${key}`);
      const options = registeredPartitionedTables[
        key
      ] as PartitionedTableOptions;

      let startTime = DateTime.utc();
      let endTime = DateTime.utc();
      const schemaName = options.schema || 'public';
      let partitionSuffix = '';
      switch (options.frequency) {
        case 'monthly':
          startTime = startTime.plus({ month: 1 }).startOf('month');
          endTime = endTime.plus({ month: 1 }).endOf('month');
          partitionSuffix = startTime.toFormat('yyyy_MM');
          break;
        case 'daily':
          startTime = startTime.plus({ year: 1 }).startOf('day');
          endTime = endTime.plus({ days: 1 }).endOf('day');
          partitionSuffix = startTime.toFormat('yyyy_MM_dd');
          break;
        default:
          startTime = startTime.plus({ years: 1 }).startOf('year');
          endTime = endTime.plus({ years: 1 }).endOf('year');
          partitionSuffix = startTime.toFormat('yyyy');
          break;
      }

      this.orm.query(
        ` CREATE TABLE IF NOT EXISTS "${schemaName}"."${
          options.tableName
        }_${partitionSuffix}" PARTITION OF "${schemaName}"."${
          options.tableName
        }" FOR VALUES FROM ('${startTime.toFormat(
          'yyyy-MM-dd',
        )}') TO ('${endTime.toFormat('yyyy-MM-dd')}');`,
      );
    }
  }
}
