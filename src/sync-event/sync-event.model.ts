import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class SyncEvent extends Model<SyncEvent> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  device_id!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  timestamp!: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  total_files_synced!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  total_errors!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  internet_speed!: number;
}
