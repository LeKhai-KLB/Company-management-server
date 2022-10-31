import express from "express";

declare module "express-session" {
  interface SessionData {
    user_id?: number;
    expired_skip_time?: number;
  }
}
