import { Module } from '@nestjs/common';
import { DistrictsController } from './districts.controller';
import { DistrictsService } from './districts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Districts } from 'src/entity/districts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Districts])],
  controllers: [DistrictsController],
  providers: [DistrictsService],
  exports: [DistrictsService],
})
export class DistrictsModule {}
