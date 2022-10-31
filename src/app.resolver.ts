import { Resolver, Query } from "@nestjs/graphql";
import { Req } from "~share/decorators/Req.decorator";
import { Res } from "~share/decorators/Res.decorator";
import { Request, Response } from "express";

@Resolver()
export class FooResolver {
  @Query(() => String)
  setId(@Res() res: Response) {
    res.cookie("id", "1", {
      httpOnly: true,
      secure: true,
    });
    return "Hello world!";
  }

  @Query(() => String)
  getId(@Req() req: Request) {
    return req.cookies["id"];
  }
}
