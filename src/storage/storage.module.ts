import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateLogEntity } from './entities/update-log.entity';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        ssl: {
          rejectUnauthorized: false,
        },
        autoLoadEntities: true,
        synchronize: false,
        retryAttempts: 1,
        cli: {
          migrationsDir: join(__dirname, 'migrations'),
        },
        entities: [
          join(__dirname, 'entities', '*.entity.{ts,js}'),
          join(__dirname, 'entities', '**', '*.entity.{ts,js}'),
        ],
        migrations: [
          join(__dirname, 'migrations', '*.{ts,js}'),
          join(__dirname, 'migrations', '**', '*.{ts,js}'),
        ],
        subscribers: [
          join(__dirname, 'subscribers', '*.{ts,js}'),
          join(__dirname, 'subscribers', '**', '*.{ts,js}'),
        ],
      }),
    }),
    TypeOrmModule.forFeature([UserEntity, UpdateLogEntity]),
  ],
})
export class StorageModule {}
