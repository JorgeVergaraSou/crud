import { Module } from '@nestjs/common';
import { PublishingsService } from './publishings.service';
import { PublishingsController } from './publishings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publishing } from './entities/publishing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publishing])],
  controllers: [PublishingsController],
  providers: [PublishingsService],
})
export class PublishingsModule {}
