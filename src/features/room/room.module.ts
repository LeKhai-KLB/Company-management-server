import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomResolver } from './room.resolver';

@Module({
  providers: [RoomService, RoomResolver]
})
export class RoomModule {}
