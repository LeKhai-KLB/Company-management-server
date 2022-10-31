import {
  IsEnum,
  IsString,
  IsNumber,
  IsNotEmpty,
  Contains,
  Allow,
} from "class-validator";
import { ENVIRONMENT } from "~/constants/app.constants";

class EnvironmentVariables {
  @IsEnum(ENVIRONMENT)
  @IsNotEmpty()
  STAGE: ENVIRONMENT;

  @IsString()
  APP_HOST?: string = "localhost";

  @IsNumber()
  APP_PORT?: number = 4000;

  @Allow()
  CLIENT_ORIGIN?: string;

  @IsString()
  @IsNotEmpty()
  APP_SECRET_KEY: string;

  @IsNumber()
  @IsNotEmpty()
  JWT_ACCESS_TOKEN_EXPIRE_SEC: number;

  @IsNumber()
  @IsNotEmpty()
  EXPIRED_SKIP_SESSION_MILI_SEC: number;
}

export class StagingEnvironmentVariables extends EnvironmentVariables {
  @Contains("postgresql://", { message: "gà" })
  COCKROACHDB_URL: string;

  @Contains("redis://redis")
  REDIS_URL: string;

  @IsString()
  @IsNotEmpty()
  REDIS_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  REDIS_PASSWORD: string;
}

export class DevEnvironmentVariables extends EnvironmentVariables {
  @IsString()
  POSTGRES_HOST?: string = "localhost";

  @IsNumber()
  POSTGRES_POST?: number = 5432;

  @IsString()
  @IsNotEmpty()
  POSTGRES_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_DATABASE: string;

  @IsString()
  REDIS_HOST?: string = "localhost";

  @IsNumber()
  REDIS_PORT?: number = 6379;
}

export class ProdEnvironmentVariables extends EnvironmentVariables {}
