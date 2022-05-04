import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('Users')
export class UserEntity extends BaseEntity {
  @PrimaryColumn({ type: 'int', nullable: false, unique: true })
  id: number;

  @CreateDateColumn()
  timestampCreate: Date;

  @UpdateDateColumn()
  timestampUpdate: Date;

  @Column({ type: 'boolean', nullable: false, default: false })
  isBot: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  isAdmin: boolean;

  @Column({ type: 'varchar', nullable: true })
  firstName: string | null;

  @Column({ type: 'varchar', nullable: true })
  lastName: string | null;

  @Column({ type: 'varchar', nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  languageCode: string;
}
