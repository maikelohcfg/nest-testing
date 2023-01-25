import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('MAIN_BD_HOST'),
  port: configService.get<number>('MAIN_BD_PORT'),
  username: configService.get<string>('MAIN_BD_USERNAME'),
  password: configService.get<string>('MAIN_BD_PASSWORD'),
  database: configService.get<string>('MAIN_BD_DATABASE'),
  // entities: [People],
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: ['./migrations/*.ts'],
});
