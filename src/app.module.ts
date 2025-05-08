import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SyncEventModule } from './sync-event/sync-event.module';

@Module({
  imports: [DatabaseModule, SyncEventModule],
})
export class AppModule {}
