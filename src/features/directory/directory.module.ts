import { Module } from '@nestjs/common';
import { DirectoryService } from './directory.service';
import { DirectoryResolver } from './directory.resolver';

@Module({
  providers: [DirectoryService, DirectoryResolver]
})
export class DirectoryModule {}
