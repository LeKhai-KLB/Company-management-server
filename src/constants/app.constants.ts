export enum ERROR_CODE {
  DUPLICATED = 23505,
  NOT_FOUND = 404,
}

export enum ENVIRONMENT {
  DEV = "dev",
  STAGING = "staging",
  PROD = "prod",
}

export enum COOKIES_KEY {
  TOKEN = "TOKEN",
}

export enum CONFIG_KEY {
  APP_HOST = "APP_HOST",
  APP_PORT = "APP_PORT",
  APP_SECRET_KEY = "APP_SECRET_KEY",
  JWT_ACCESS_TOKEN_EXPIRE_SEC = "JWT_ACCESS_TOKEN_EXPIRE_SEC",
  EXPIRED_SKIP_SESSION_MILI_SEC = "EXPIRED_SKIP_SESSION_MILI_SEC",
  REDIS_HOST = "REDIS_HOST",
  REDIS_PORT = "REDIS_PORT",
  REDIS_USERNAME = "REDIS_USERNAME",
  REDIS_PASSWORD = "REDIS_PASSWORD",
  REDIS_URL = "REDIS_URL",
  CLIENT_ORIGIN = "CLIENT_ORIGIN",
  POSTGRES_HOST = "POSTGRES_HOST",
  POSTGRES_POST = "POSTGRES_POST",
  POSTGRES_USERNAME = "POSTGRES_USERNAME",
  POSTGRES_PASSWORD = "POSTGRES_PASSWORD",
  POSTGRES_DATABASE = "POSTGRES_DATABASE",
  COCKROACHDB_URL = "COCKROACHDB_URL",
}

export enum GROUP_ROLE {
  IS_ADMIN = "IS_ADMIN",
  MEMBER = "MEMBER",
  GUEST = "GUEST",
}

export enum ROOM_ROLE {
  OWNER = "OWNER",
  PARTICIPANTS = "PARTICIPANTS",
  PETITIONER = "PETITIONER",
}

export enum TASK_TAG {
  TODO = "TODO",
  DOING = "DOING",
  FULFILLMENT = "FULFILLMENT",
}
