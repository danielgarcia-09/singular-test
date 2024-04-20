import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.get('DB_HOST'),
                port: config.get<number>('DB_PORT', 5432),
                database: config.get('DB_NAME'),
                username: config.get('DB_USER'),
                password: config.get('DB_PASS'),
                autoLoadEntities: true,
                synchronize: true,
                logger: 'advanced-console',
                logging: 'all',
            })
        })
    ]
})
export class CoreModule { }
