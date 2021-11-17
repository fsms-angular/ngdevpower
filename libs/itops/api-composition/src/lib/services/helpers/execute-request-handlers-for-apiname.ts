import { LogService } from '@branding/core/log';
import { extend } from 'lodash';
import {
  ApiCompositionModuleSettings,
  ComposedRequest,
  IRequestHandler,
} from '../../interfaces';
import { traceBeforeExecuting } from './trace-before-execution-each-service';

export async function executeAllRequestHandlersForApiName(
  args: any,
  composedRequest: ComposedRequest,
  handlers: IRequestHandler[],
  logService: LogService,
  settings: ApiCompositionModuleSettings,
  apiKey: string
) {
  const composedResponse = {};

  for (const handler of handlers) {
    traceBeforeExecuting(
      handler,
      logService,
      settings,
      `Handling http request for ApiName: ${apiKey}`
    );

    const response = await handler.makeRequest(args, composedRequest);

    extend(composedResponse, response);
  }

  return composedResponse;
}
