import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

export const TypeORMConfigModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (confifService: ConfigService) => {
    return {
      type: "postgres",
      host: confifService.get("POSTGRES_HOST"),
      port: confifService.get("POSTGRES_POST"),
      username: confifService.get("POSTGRES_USERNAME"),
      password: confifService.get("POSTGRES_PASSWORD"),
      database: confifService.get("POSTGRES_DATABASE"),
      autoLoadEntities: true,
      synchronize: true,
    };
  },
});
