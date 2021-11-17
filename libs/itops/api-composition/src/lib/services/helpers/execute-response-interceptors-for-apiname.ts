import { LogService } from '@branding/core/log';
import {
  ApiCompositionModuleSettings,
  ComposedResponse,
  IResponseInterceptor,
} from '../../interfaces';
import { traceBeforeExecuting } from './trace-before-execution-each-service';

export async function executeResponseInterceptorsForApiName(
  args: any,
  composedResponse: ComposedResponse,
  responseInterceptors: IResponseInterceptor[] = [],
  logService: LogService,
  settings: ApiCompositionModuleSettings,
  apiKey: string
): Promise<ComposedResponse> {
  for (const interceptor of responseInterceptors) {
    traceBeforeExecuting(
      interceptor,
      logService,
      settings,
      `Intercepting composed response for ApiName: ${apiKey}`
    );

    await interceptor.visit(args, composedResponse);
  }

  return composedResponse;
}
