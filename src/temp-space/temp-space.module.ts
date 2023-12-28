import { Module } from '@nestjs/common';
import { TempSpaceController } from './temp-space.controller';
import { TempSpaceService } from './temp-space.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TempSpace } from 'src/entity/tempSpace.entity';
import { SpacesModule } from 'src/spaces/spaces.module';

@Module({
  imports: [SpacesModule, TypeOrmModule.forFeature([TempSpace])],
  controllers: [TempSpaceController],
  providers: [TempSpaceService],
})
export class TempSpaceModule {}
