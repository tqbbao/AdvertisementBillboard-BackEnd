import { Module } from '@nestjs/common';
import { LocationTypesController } from './location-types.controller';
import { LocationTypesService } from './location-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationTypes } from 'src/entity/location-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocationTypes])],
  controllers: [LocationTypesController],
  providers: [LocationTypesService]
})
export class LocationTypesModule {}
