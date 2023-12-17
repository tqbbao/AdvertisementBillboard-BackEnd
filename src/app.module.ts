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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin123',
      database: 'be_wnc',
      entities: [SurfaceTypes, Surfaces, FormAdvertising, LocationTypes, Spaces, Districts, Wards],
      synchronize: true,
    }),
    SurfacesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
