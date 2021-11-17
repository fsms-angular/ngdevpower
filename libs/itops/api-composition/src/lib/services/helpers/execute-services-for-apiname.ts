import { LogService } from '@branding/core/log';
import {
  ApiCompositionModuleSettings,
  ComposedResponse,
  IRequestHandler,
  IRequestInterceptor,
  IResponseInterceptor,
} from '../../interfaces';
import { executeAllRequestHandlersForApiName } from './execute-request-handlers-for-apiname';
import { executeRequestInterceptorsForApiName } from './execute-request-interceptors-for-apiname';
import { executeResponseInterceptorsForApiName } from './execute-response-interceptors-for-apiname';

export async function executeServicesForApiName({
  args,
  requestInterceptors,
  requestHandlers,
  responseInterceptors,
  logger: logService,
  settings,
  apiKey,
}: {
  args: any;
  requestInterceptors: IRequestInterceptor[];
  requestHandlers: IRequestHandler[];
  responseInterceptors: IResponseInterceptor[];
  logger: LogService;
  settings: ApiCompositionModuleSettings;
  apiKey: string;
}): Promise<ComposedResponse> {
  /**
   * 🚨 Don't Change the Sequence
   */

  // First: Run Request Interceptors
  const composedRequest = await executeRequestInterceptorsForApiName(
    args,
    requestInterceptors,
    logService,
    settings,
    apiKey
  );

  // Second: Run Request Handlers
  let composedResponse = await executeAllRequestHandlersForApiName(
    args,
    composedRequest,
    requestHandlers,
    logService,
    settings,
    apiKey
  );

  // Third: Run Response Interceptors
  composedResponse = await executeResponseInterceptorsForApiName(
    args,
    composedResponse,
    responseInterceptors,
    logService,
    settings,
    apiKey
  );

  return composedResponse;
}
