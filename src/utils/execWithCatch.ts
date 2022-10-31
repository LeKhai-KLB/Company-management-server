import { InternalServerErrorException, Logger } from "@nestjs/common";
import { ERROR_CODE } from "~/constants/app.constants";

type TExecWithCatchOptions = {
  pick?: ERROR_CODE[];
  omit?: ERROR_CODE[];
  entireCheck?: boolean;
};

export async function execWithCatch(
  callback: () => Promise<unknown>,
  options: TExecWithCatchOptions = {},
): Promise<[any, any]> {
  const { pick, omit, entireCheck } = options;
  let result: any;
  let error: any;
  try {
    result = await callback();
  } catch (err) {
    Logger.error(err);
    err.code = +err.code as ERROR_CODE;
    if (
      (err.code in ERROR_CODE &&
        pick?.includes(err.code) &&
        !omit?.includes(err.code)) ||
      entireCheck
    )
      error = err;
    else {
      throw new InternalServerErrorException();
    }
  }
  return [result, error];
}
