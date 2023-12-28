import { Module } from '@nestjs/common';
import { WardsController } from './wards.controller';
import { WardsService } from './wards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wards } from 'src/entity/wards.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wards])],
  controllers: [WardsController],
  providers: [WardsService],
  exports: [WardsService]
})
export class WardsModule {}
