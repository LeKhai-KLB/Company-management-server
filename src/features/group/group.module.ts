import { Module } from "@nestjs/common";
import { GroupService } from "./group.service";
import { GroupResolver } from "./group.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "./entity/group.entity";
import { GroupMember } from "./entity/group-member.entity";
import { UserModule } from "~features/user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Group, GroupMember]), UserModule],
  providers: [GroupService, GroupResolver],
  exports: [GroupService],
})
export class GroupModule {}
