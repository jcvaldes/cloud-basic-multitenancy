import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenancyModule } from './tenancy/tenancy.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';

@Module({
  imports: [
    TenancyModule,
    // cargo variables de entorno cuando levanta la aplicacion
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      async useFactory(config: ConfigService) {
        return {
          type: 'mysql',
          host: config.get('DB_HOST'),
          username: config.get('DB_USER'),
          password: config.get('DB_PASSWORD'),
          port: +config.get('DB_PORT'),
          database: config.get('DB_NAME'),
          autoLoadEntities: true,
          // solo en dev sinchronize: true asi cuando se actualiza el modelo impacta en la db
          synchronize: true,
          ssl: true,
        } as ConnectionOptions;
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
