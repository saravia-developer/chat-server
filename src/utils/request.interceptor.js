import { AppDate } from "../lib/app-date.js";
import { AppError } from "../lib/app-error.js";
import { HttpCode } from "../lib/http-status-codes.js";

function getDurationInMilliseconds(start) {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
}

export function getTrace() {
  return crypto.randomUUID();
}

export function requestStart(req, res, next) {
  const trace = getTrace();
  const start = process.hrtime();
  const now = new AppDate();
  const timeLapse = {
    started: now.toMYSQLDatetime(),
    ended: null,
    duration: null,
  };
  Object.assign(req, { trace, timeLapse, start });
  
  next();
}

export function requestEnd(
  result,
  req,
  res,
  next
) {
  const timeLapse = req.timeLapse ?? {};
  const start = req.start;
  timeLapse.ended = new AppDate().toMYSQLDatetime();
  timeLapse.duration = getDurationInMilliseconds(start);

  if (result instanceof AppError) {
    const response = {
      success: false,
      kindMessage: result.message,
      stack: result.stack,
      httpCode: result.httpCode,
      timeLapse,
    };

    if (env.stage === STAGE.PROD) delete response.stack;
    next(response);
  } else {
    const { httpCode } = result;
    delete result.httpCode;
    res.status(httpCode || HttpCode.OK).json({ ...result, timeLapse });

  }
}