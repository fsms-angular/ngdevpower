import { LogService } from '@branding/core/log';

export function handleCompositionError(error: any, logger: LogService) {
  logger.scriptException(error);
  const msg = error.message + error.stack;
  console.log(msg);

  throw error;
}
