import { Injectable } from '@angular/core';
import { LogService } from '@branding/core/log';
import {
  ComposedRequest,
  IRequestInterceptor,
  RequestInterceptor,
} from '../../interfaces';
import { testEduGetItem } from './test-api-keys';

@Injectable({providedIn:'root'})
@RequestInterceptor({
  apiKeys: [testEduGetItem],
  serviceName: 'test_inventory_items_GetItemRequestInterceptor',
  isTracingOn: false,
})
export class GetItemRequestInterceptor implements IRequestInterceptor {
  constructor(public logService: LogService) {}

  async compose(args: any, composedRequest: ComposedRequest): Promise<void> {
    this.logService.scriptVerbose('adding item ids');
    console.log('my args', args);

    composedRequest.items = ['i1', 'i2', 'i3'];
  }
}
