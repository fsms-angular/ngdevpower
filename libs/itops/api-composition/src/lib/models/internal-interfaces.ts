import { Type } from '@angular/core';
import {
  IRequestHandler,
  IRequestInterceptor,
  IResponseInterceptor,
} from '../interfaces';

export interface ApiCompositionServices {
  requestHandlers?: IRequestHandler[];
  requestInterceptors?: IRequestInterceptor[];
  responseInterceptors?: IResponseInterceptor[];
}

export interface IServiceDictionary<T> {
  [queryId: string]: T[];
}

export interface ApiCompositionModuleOption {
  requestHandlers?: Type<IRequestHandler>[];
  responseInterceptors?: Type<IResponseInterceptor>[];
  requestInterceptors?: Type<IRequestInterceptor>[];
}
