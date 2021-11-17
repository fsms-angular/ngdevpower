import { Injectable } from '@angular/core';
import {
  IRequestHandler,
  IRequestInterceptor,
  IResponseInterceptor,
} from '../interfaces';
import {
  ApiCompositionServices,
  IServiceDictionary,
} from './internal-interfaces';
import { getApiCompositionServiceMetadata } from './metadata';

@Injectable()
export class ApiCompositionSources {
  private requestInterceptors: IServiceDictionary<IRequestInterceptor> = {};
  private requestHandlers: IServiceDictionary<IRequestHandler> = {};
  private responseInterceptors: IServiceDictionary<IResponseInterceptor> = {};

  addServices({
    requestHandlers,
    responseInterceptors,
    requestInterceptors,
  }: ApiCompositionServices) {
    this.addService(requestHandlers, this.requestHandlers);
    this.addService(responseInterceptors, this.responseInterceptors);
    this.addService(requestInterceptors, this.requestInterceptors);
  }

  private addService(sources: any[], target: IServiceDictionary<any>) {
    sources.forEach((src) => {
      const { apiKeys } = getApiCompositionServiceMetadata(src);
      apiKeys.forEach((apikey) => {
        if (!target[apikey]) {
          target[apikey] = [];
        }
        target[apikey].push(src);
      });
    });
  }

  requestHandlersByApikey(apiKey: string) {
    return this.requestHandlers[apiKey] || [];
  }

  requestInterceptorsByApikey(apiKey: string) {
    return this.requestInterceptors[apiKey] || [];
  }

  responseInterceptorsByApikey(apiKey: string) {
    return this.responseInterceptors[apiKey] || [];
  }

  getServicesByApiKey(apiKey: string) {
    return {
      requestHandlers: this.requestHandlersByApikey(apiKey),
      requestInterceptors: this.requestInterceptorsByApikey(apiKey),
      responseInterceptors: this.responseInterceptorsByApikey(apiKey),
    };
  }
}
