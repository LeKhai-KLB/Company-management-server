import { ValidationPipe, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import { CONFIG_KEY, ENVIRONMENT } from "~constants/app.constants";
import { UnauthorizedExceptionFilter } from "~exception-filter/unauthorize.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();
  const logger = new Logger();
  const PORT = configService.get(CONFIG_KEY.APP_PORT);
  const CLIENT_ORIGIN = configService.get(CONFIG_KEY.CLIENT_ORIGIN) || true;
  const APP_SECRET_KEY = configService.get(CONFIG_KEY.APP_SECRET_KEY);
  const stage = process.env.STAGE;

  app.enableCors();
  app.useGlobalFilters(app.get(UnauthorizedExceptionFilter));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(cookieParser());
  app.use(
    session({
      secret: APP_SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: stage === ENVIRONMENT.PROD,
      },
    }),
  );
  await app.listen(PORT);
  logger.log(`App listen on port ${PORT}`);
}
bootstrap();
