import { Injectable } from '@angular/core';
import { LogService } from '@branding/core/log';
import { IResponseInterceptor, ResponseInterceptor } from '../../interfaces';
import { testEduGetItem } from './test-api-keys';
@Injectable()
@ResponseInterceptor({
  apiKeys: [testEduGetItem],
  serviceName: 'test_education_GetItemResponseInterceptor',
})
export class GetItemResponseInterceptor implements IResponseInterceptor {
  static $inject = ['logService'];

  constructor(public logService: LogService) {}

  async visit(args: any, composedResponse: any) {
    console.log(
      'I can read data from composedResponse',
      composedResponse.items,
      args
    );
  }
}
