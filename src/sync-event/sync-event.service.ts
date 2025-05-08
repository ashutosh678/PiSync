import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SyncEvent } from './sync-event.model';
import { Op } from 'sequelize';

type RequiredSyncEventData = Required<
  Pick<
    SyncEvent,
    | 'device_id'
    | 'timestamp'
    | 'total_files_synced'
    | 'total_errors'
    | 'internet_speed'
  >
>;

@Injectable()
export class SyncEventService {
  constructor(
    @InjectModel(SyncEvent)
    private syncEventModel: typeof SyncEvent,
  ) {}

  async createSyncEvent(data: RequiredSyncEventData): Promise<SyncEvent> {
    const syncEvent = await this.syncEventModel.create(data as SyncEvent);

    if (data.total_errors > 0) {
      const recentFailures = await this.syncEventModel.findAll({
        where: { device_id: data.device_id, total_errors: { [Op.gt]: 0 } },
        order: [['timestamp', 'DESC']],
        limit: 3,
      });

      if (recentFailures.length === 3) {
        console.log(
          `Device ${data.device_id} has failed to sync 3 times in a row.`,
        );
      }
    }

    return syncEvent;
  }

  async getSyncHistory(deviceId: string): Promise<SyncEvent[]> {
    return this.syncEventModel.findAll({ where: { device_id: deviceId } });
  }

  async getDevicesWithRepeatedFailures(): Promise<any[]> {
    return this.syncEventModel.findAll({
      attributes: ['device_id'],
      where: { total_errors: { [Op.gt]: 3 } },
      group: ['device_id'],
    });
  }
}
