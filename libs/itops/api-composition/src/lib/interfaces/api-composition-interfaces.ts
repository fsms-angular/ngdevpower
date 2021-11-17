export interface ApiCompositionServiceDefinition {
  /**
   * @description
   * Trace and log on server
   *
   * @param isTracingOn
   *
   * Default value is true
   */
  isTracingOn?: boolean;
  /**
   * @description
   * Unique identifier for the Api URL
   *
   * @param apiKeys apiKeys array
   *
   *
   */
  apiKeys: string[];
  /**
   * @description
   * Used for Tracing only.
   *
   * @param serviceName Name of the Service
   *
   *
   */
  serviceName: string;
}

export type ComposedRequest = any;

export type ComposedResponse = any;

export interface IResponseInterceptor {
  /**
   * @description
   * Read Composed Response. Do not modify composed response.
   * @returns
   * Promise<void>
   */
  visit(args: any, composedResponse: ComposedResponse): Promise<void>;
}

export interface IRequestInterceptor {
  /**
   * @description
   * Update Composed Request Object
   * @returns Promise<void>
   */
  compose(args: any, composedRequest: ComposedRequest): Promise<void>;
}

/**
 * @usageNotes
 * To define a Request Handler, mark the class with the decorator and provide metadata
 *
 * ```ts
 *  import {RequestHandler} from '@branding/core/api-composition';
 *  @RequestHandler({
 *   apiKeys: ['ORDERS_GET'],
 *   serviceName: 'finance_orders_orderRequestHandler',
 *  })
 *  export class GetOrderRequestHandler implements IRequestHandler {
 *     constructor(public httpClient: HttpClient) {}
 *     async makeRequest(args: any, composedRequest: any) {
 *       const result = await this.httpClient.get('http://localhost/myweb.com/api/orders').toPromise();
 *       console.log(result);
 *     }
 *  }
 * ```
 */
export interface IRequestHandler {
  /**
   * @description
   * Make Http Call and send composedRequest as payload
   * @returns Promise<void>
   */
  makeRequest(args: any, composedRequest: ComposedRequest): Promise<void>;
}

export interface ApiCompositionModuleSettings {
  isTracingOn: boolean;
}
