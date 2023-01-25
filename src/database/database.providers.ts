import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

export const databaseProviders = [
  {
    provide: 'DATA_ORM',
    useFactory: async () => {
      const configService = new ConfigService();

      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('MAIN_BD_HOST'),
        port: configService.get<number>('MAIN_BD_PORT'),
        username: configService.get<string>('MAIN_BD_USERNAME'),
        password: configService.get<string>('MAIN_BD_PASSWORD'),
        database: configService.get<string>('MAIN_BD_DATABASE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('MAIN_BD_SYNC'),
      });

      return dataSource.initialize();
    },
  },
];
