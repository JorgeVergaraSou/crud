import { Module } from '@nestjs/common';
import { PublishingsService } from './publishings.service';
import { PublishingsController } from './publishings.controller';

@Module({
  controllers: [PublishingsController],
  providers: [PublishingsService],
})
export class PublishingsModule {}
