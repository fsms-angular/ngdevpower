import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ComposedRequest,
  IRequestHandler,
  RequestHandler,
} from '../../interfaces';
import { testEduGetItem } from './test-api-keys';

@Injectable()
@RequestHandler({
  apiKeys: [testEduGetItem],
  serviceName: 'test_education_items_GetItemRequestHandler',
})
export class GetItemRequestHandler implements IRequestHandler {
  constructor(public httpClient: HttpClient) {}

  async makeRequest(args: any, composedRequest: ComposedRequest) {
    console.log('making http call using :', composedRequest, args);

    const result = await this.httpClient
      .get('http://localhost/my.com/api/items', composedRequest)
      .toPromise();

    console.log(result);
  }
}
