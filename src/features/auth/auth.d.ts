import express from "express";

declare module "express-session" {
  interface SessionData {
    user_id?: number;
    default_group?: string;
    default_project?: string;
    expired_skip_time?: number;
  }
}
