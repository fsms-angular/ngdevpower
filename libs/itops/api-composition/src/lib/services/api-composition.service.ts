import { Injectable } from '@angular/core';
import { AppConfigService } from '@branding/core/config';
import { LogService } from '@branding/core/log';
import {
  ComposedResponse,
  IRequestHandler,
  IRequestInterceptor,
  IResponseInterceptor,
} from '../interfaces';
import { ApiCompositionSources } from '../models/api-composition-sources';
import { IServiceDictionary } from '../models/internal-interfaces';
import { executeServicesForApiName } from './helpers/execute-services-for-apiname';
import { handleCompositionError } from './helpers/handle-composition-error';
import { traceServiceCountForApiKey } from './helpers/trace-service-count-for-apiname';
@Injectable({ providedIn: 'root' })
export class ApiCompositionService  {
  responseInterceptors: IServiceDictionary<IResponseInterceptor> = {};
  requestInterceptors: IServiceDictionary<IRequestInterceptor> = {};
  requestHandlers: IServiceDictionary<IRequestHandler> = {};

  constructor(
    private readonly sources: ApiCompositionSources,
    private readonly logger: LogService,
    private readonly appConfigService: AppConfigService
  ) {}

  /**
   * @description
   * Makes api call in async manner first calls all the request interceptors for the given apiName, then call all of the request handlers after that it will call all of the response interceptors.Make sure you have created a request handler.
   * @param apiKey The apikey
   * @param args dynamic object containing extra props to pass around.
   * @returns Promise<ComposedResponse> composed response object once request handler, request interceptors & response interceptors calls are done
   * @usageNotes
   * To call an api composition use requestAsync method.
   * ### Requesting For an ApiKey
   * ```ts
   * const result = await apiCompositionService.requestAsync('TESTLET_GET', {esid,testletId});
   * ```
   */
  async requestAsync(
    apiKey: string,
    args: any = {}
  ): Promise<ComposedResponse> {
    try {
      const {
        requestInterceptors,
        requestHandlers,
        responseInterceptors,
      } = this.sources.getServicesByApiKey(apiKey);
      const settings = this.appConfigService.config.apiComposition;
      const logger = this.logger;

      traceServiceCountForApiKey({
        requestInterceptors,
        requestHandlers,
        responseInterceptors,
        apiKey,
        logger,
        settings,
      });

      const composedResponse = await executeServicesForApiName({
        args,
        requestInterceptors,
        requestHandlers,
        responseInterceptors,
        logger,
        settings,
        apiKey,
      });

      return composedResponse;
    } catch (error) {
      return handleCompositionError(error, this.logger);
    }
  }
}
