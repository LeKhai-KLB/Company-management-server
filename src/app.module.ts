import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { FooResolver } from "./app.resolver";
import { AuthModule } from "~features/auth/auth.module";
import { TypeORMConfigModule } from "~app-configs/TypeORMConfigModule";
import { GraphQLConfigModule } from "~app-configs/GraphQLConfigModule";
import { UserModule } from "~features/user/user.module";
import { RedisModule } from "~features/redis/redis.module";
import { DevController } from "~routes/dev.controller";
import { configsValidate } from "~app-configs/validate/configs.validate";
import { UnauthorizedExceptionFilter } from "~exception-filter/unauthorize.filter";
import { GroupModule } from "~features/group/group.module";
import { DirectoryModule } from './features/directory/directory.module';
import { RoomModule } from './features/room/room.module';
import { MessageModule } from './features/message/message.module';
import { TaskModule } from './features/task/task.module';
import { ProjectModule } from './features/project/project.module';
import { SprintModule } from './features/sprint/sprint.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.STAGE}`, ".env"],
      validate: configsValidate,
      isGlobal: true,
      cache: true,
    }),
    TypeORMConfigModule,
    GraphQLConfigModule,
    RedisModule,
    AuthModule,
    UserModule,
    RedisModule,
    GroupModule,
    DirectoryModule,
    RoomModule,
    MessageModule,
    TaskModule,
    ProjectModule,
    SprintModule,
  ],
  providers: [FooResolver, UnauthorizedExceptionFilter],
  controllers: [DevController],
  exports: [UnauthorizedExceptionFilter],
})
export class AppModule {}
