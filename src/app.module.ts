import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurfaceTypes } from './entity/surface-types.entity';
import { Surfaces } from './entity/surfaces.entity';
import { FormAdvertising } from './entity/form-advertising.entity';
import { LocationTypes } from './entity/location-types.entity';
import { Spaces } from './entity/spaces.entity';
import { Districts } from './entity/districts.entity';
import { Wards } from './entity/wards.entity';
import { SurfacesModule } from './surfaces/surfaces.module';
import { SpacesModule } from './spaces/spaces.module';
import { FormReport } from './entity/form-report.entity';
import { ReportsSpaceModule } from './reports-space/reports-space.module';
import { ReportSpace } from './entity/reportSpace.entity';
import { ReportsSurfaceModule } from './reports-surface/reports-surface.module';
import { ReportSurface } from './entity/reportSurface.entity';
import { RequestEditSpace } from './entity/requestEditSpace.entity';
import { WardsModule } from './wards/wards.module';
import { ReverseGeocodingModule } from './reverse-geocoding/reverse-geocoding.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DistrictsModule } from './districts/districts.module';
import { RequestSpaceModule } from './request-space/request-space.module';
import { MailerModule } from '@nestjs-modules/mailer';

import { join } from 'path';
import { User } from './entity/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FormReportsModule } from './form-reports/form-reports.module';
import { RequestSurfaceModule } from './request-surface/request-surface.module';
import { TempSpace } from './entity/tempSpace.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Đặt isGlobal để có thể sử dụng ConfigService ở mọi nơi trong ứng dụng
      envFilePath: ['.env', '.env.development'], // Danh sách các tệp .env để đọc (tùy chọn)
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        SurfaceTypes,
        Surfaces,
        FormAdvertising,
        LocationTypes,
        Spaces,
        Districts,
        Wards,
        FormReport,
        ReportSpace,
        ReportSurface,
        RequestEditSpace,
        User,
        TempSpace,
      ],
      synchronize: true,
    }),
    SurfacesModule,
    SpacesModule,
    ReportsSpaceModule,
    ReportsSurfaceModule,
    WardsModule,
    ReverseGeocodingModule,
    DistrictsModule,
    RequestSpaceModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule để sử dụng ConfigService
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          secure: false,
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${configService.get('MAIL_FROM')}>`,
        },
        // template: {
        //   dir: process.cwd() + '/templates/email',
        //   adapter: new HandlebarsAdapter(), // Sử dụng HandlebarsAdapter
        //   options: {
        //     strict: true,
        //   },
        // },
      }),
      inject: [ConfigService], // Inject ConfigService để sử dụng cấu hình
    }),
    UsersModule,
    AuthModule,
    FormReportsModule,
    RequestSurfaceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
