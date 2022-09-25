import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ConfigValidationSchema } from "./config.schema";
import { FooResolver } from "./app.resolver";
import { AuthModule } from "./features/auth/auth.module";
import { TypeORMConfigModule } from "./app-configs/TypeORMConfigModule";
import { GraphQLConfigModule } from "./app-configs/GraphQLConfigModule";
import { CacheConfigModule } from "./app-configs/CacheConfigModule";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.STAGE}`, ".env"],
      validationSchema: ConfigValidationSchema,
      isGlobal: true,
      cache: true,
    }),
    TypeORMConfigModule,
    GraphQLConfigModule,
    CacheConfigModule,
    AuthModule,
  ],
  providers: [FooResolver],
})
export class AppModule {}
