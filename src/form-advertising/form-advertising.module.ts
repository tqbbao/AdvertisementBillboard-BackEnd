import { Module } from '@nestjs/common';
import { FormAdvertisingController } from './form-advertising.controller';
import { FormAdvertisingService } from './form-advertising.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormAdvertising } from 'src/entity/form-advertising.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormAdvertising])],
  controllers: [FormAdvertisingController],
  providers: [FormAdvertisingService]
})
export class FormAdvertisingModule {}
