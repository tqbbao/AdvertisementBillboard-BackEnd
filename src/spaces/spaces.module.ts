import { Module } from '@nestjs/common';
import { SpacesController } from './spaces.controller';
import { SpacesService } from './spaces.service';
import { Spaces } from 'src/entity/spaces.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Spaces]),
  HttpModule],

  controllers: [SpacesController],
  providers: [SpacesService]
})
export class SpacesModule {}
