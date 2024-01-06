import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({global: true,}),],
  providers: [EventsGateway],
  exports: [EventsGateway]
})
export class EventsModule {}