import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { SyncEventService } from './sync-event.service';
import { IsString, IsDate, IsInt } from 'class-validator';

class CreateSyncEventDto {
  @IsString()
  device_id: string;

  @IsDate()
  timestamp: Date;

  @IsInt()
  total_files_synced: number;

  @IsInt()
  total_errors: number;

  @IsInt()
  internet_speed: number;
}

@Controller('sync-event')
export class SyncEventController {
  constructor(private readonly syncEventService: SyncEventService) {}

  @Post()
  create(@Body() createSyncEventDto: CreateSyncEventDto) {
    return this.syncEventService.createSyncEvent(createSyncEventDto);
  }

  @Get('device/:id/sync-history')
  getSyncHistory(@Param('id') id: string) {
    return this.syncEventService.getSyncHistory(id);
  }

  @Get('devices/repeated-failures')
  getDevicesWithRepeatedFailures() {
    return this.syncEventService.getDevicesWithRepeatedFailures();
  }
}
