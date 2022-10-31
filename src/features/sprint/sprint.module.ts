import { Module } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { SprintResolver } from './sprint.resolver';

@Module({
  providers: [SprintService, SprintResolver]
})
export class SprintModule {}
