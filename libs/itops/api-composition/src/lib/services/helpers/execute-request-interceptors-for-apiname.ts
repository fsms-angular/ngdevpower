import { LogService } from '@branding/core/log';
import {
  ApiCompositionModuleSettings,
  ComposedRequest,
  IRequestInterceptor,
} from '../../interfaces';
import { traceBeforeExecuting } from './trace-before-execution-each-service';

export async function executeRequestInterceptorsForApiName(
  args: any,
  interceptors: IRequestInterceptor[] = [],
  logService: LogService,
  settings: ApiCompositionModuleSettings,
  apiKey: string
): Promise<ComposedRequest> {
  const composedRequest: ComposedRequest = {};

  for (const interceptor of interceptors) {
    traceBeforeExecuting(
      interceptor,
      logService,
      settings,
      `Intercepting composed request for ApiName: ${apiKey}`
    );

    await interceptor.compose(args, composedRequest);
  }

  return composedRequest;
}
