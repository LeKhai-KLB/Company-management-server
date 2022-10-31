import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import {
  DevEnvironmentVariables,
  StagingEnvironmentVariables,
  ProdEnvironmentVariables,
} from "./configs.schema";
import { ENVIRONMENT } from "~constants/app.constants";

export function configsValidate(config: Record<string, unknown>) {
  const state = process.env.STAGE;
  let schema;
  switch (state) {
    case ENVIRONMENT.DEV:
      schema = DevEnvironmentVariables;
      break;
    case ENVIRONMENT.STAGING:
      schema = StagingEnvironmentVariables;
      break;
    case ENVIRONMENT.PROD:
      schema = ProdEnvironmentVariables;
      break;
  }

  const validatedConfig = plainToInstance(schema, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig as object);

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
