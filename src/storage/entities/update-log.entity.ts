import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('LOGS_update')
export class UpdateLogEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  timestampCreate: Date;

  @Column({ type: 'varchar', nullable: false })
  message: string;

  /**
   * Добавить запись
   * @param message
   */
  static async addRecord(message: string): Promise<UpdateLogEntity> {
    let record = new UpdateLogEntity();
    record.message = message;
    record = await this.save(record);
    return record;
  }
}
