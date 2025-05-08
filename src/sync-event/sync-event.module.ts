import { Module } from '@nestjs/common';
import { SyncEventService } from './sync-event.service';
import { SyncEventController } from './sync-event.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SyncEvent } from './sync-event.model';

@Module({
  imports: [SequelizeModule.forFeature([SyncEvent])],
  providers: [SyncEventService],
  controllers: [SyncEventController],
})
export class SyncEventModule {}
