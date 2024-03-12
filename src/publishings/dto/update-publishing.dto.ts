import { PartialType } from '@nestjs/mapped-types';
import { CreatePublishingDto } from './create-publishing.dto';

export class UpdatePublishingDto extends PartialType(CreatePublishingDto) {}
