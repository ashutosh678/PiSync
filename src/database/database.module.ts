import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SyncEvent } from '../sync-event/sync-event.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ashutosh',
      password: 'ashutosh_678',
      database: 'pisync',
      models: [SyncEvent],
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
