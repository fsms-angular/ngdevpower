import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppConfigTestSetup } from '@branding/core/config';
import { BrandingCoreLogTestingModule } from '@branding/core/log';
import { of } from 'rxjs';
import { BrandingCoreApiCompositionModule } from '../../branding-core-api-composition.module';
import { ApiCompositionService } from '../../services/api-composition.service';
import { GetItemRequestHandler } from '../_module-for-spec/item-get-request-handler';
import { GetItemRequestInterceptor } from '../_module-for-spec/item-get-request-interceptor';
import { GetItemResponseInterceptor } from '../_module-for-spec/item-get-response-interceptor';
import { testEduGetItem } from '../_module-for-spec/test-api-keys';

describe('@api-compostion: Get Order Request Handler', () => {
  let apiCompositionService: ApiCompositionService;
  let handler: GetItemRequestHandler;
  let httpClient: HttpClient;

  beforeEach(async () => {
    AppConfigTestSetup.setup();

    await TestBed.configureTestingModule({
      imports: [
        BrandingCoreLogTestingModule,
        HttpClientTestingModule,
        BrandingCoreApiCompositionModule.forRoot({}),
        BrandingCoreApiCompositionModule.forFeature({
          requestHandlers: [GetItemRequestHandler],
          requestInterceptors: [GetItemRequestInterceptor],
          responseInterceptors: [GetItemResponseInterceptor],
        }),
      ],
    }).compileComponents();

    handler = TestBed.inject(GetItemRequestHandler);
    httpClient = TestBed.inject(HttpClient);
    apiCompositionService = TestBed.inject(ApiCompositionService);
  });

  it('should have orderRequestHandler', () => {
    expect(handler).toBeDefined();
  });

  it('should able to makeRequest', async () => {
    spyOn(httpClient, 'get').and.returnValue(of());
    spyOn(handler, 'makeRequest');

    await apiCompositionService.requestAsync(testEduGetItem);

    expect(handler.makeRequest).toHaveBeenCalled();
  });
});
