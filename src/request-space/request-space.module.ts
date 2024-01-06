import { Module, Req } from '@nestjs/common';
import { RequestSpaceController } from './request-space.controller';
import { RequestSpaceService } from './request-space.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestEditSpace } from 'src/entity/requestEditSpace.entity';
import { ReportsSpaceModule } from 'src/reports-space/reports-space.module';
import { SpacesModule } from 'src/spaces/spaces.module';
import { EventsModule } from 'src/event/events.module';


@Module({
  imports: [EventsModule, ReportsSpaceModule, SpacesModule, TypeOrmModule.forFeature([RequestEditSpace])],
  controllers: [RequestSpaceController],
  providers: [RequestSpaceService],
})
export class RequestSpaceModule {}
