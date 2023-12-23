import { Module } from '@nestjs/common';
import { RequestSpaceController } from './request-space.controller';
import { RequestSpaceService } from './request-space.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestEditSpace } from 'src/entity/requestEditSpace.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestEditSpace])],
  controllers: [RequestSpaceController],
  providers: [RequestSpaceService]
})
export class RequestSpaceModule {}
