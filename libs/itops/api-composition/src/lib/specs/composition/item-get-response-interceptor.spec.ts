import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppConfigTestSetup } from '@branding/core/config';
import {
  BrandingCoreLogModule,
  BrandingCoreLogTestingModule,
} from '@branding/core/log';
import { of } from 'rxjs';
import { BrandingCoreApiCompositionModule } from '../../branding-core-api-composition.module';
import { ApiCompositionService } from '../../services/api-composition.service';
import { GetItemRequestHandler } from '../_module-for-spec/item-get-request-handler';
import { GetItemRequestInterceptor } from '../_module-for-spec/item-get-request-interceptor';
import { GetItemResponseInterceptor } from '../_module-for-spec/item-get-response-interceptor';
import { testEduGetItem } from '../_module-for-spec/test-api-keys';

describe('@api-compostion: Get Order Response Interceptor', () => {
  let interceptor: GetItemResponseInterceptor;
  let apiCompositionService: ApiCompositionService;
  let httpClient: HttpClient;

  beforeEach(async () => {
    AppConfigTestSetup.setup();

    await TestBed.configureTestingModule({
      imports: [
        BrandingCoreLogTestingModule,
        BrandingCoreLogModule,
        HttpClientTestingModule,
        BrandingCoreApiCompositionModule.forRoot({}),
        BrandingCoreApiCompositionModule.forFeature({
          requestHandlers: [GetItemRequestHandler],
          requestInterceptors: [GetItemRequestInterceptor],
          responseInterceptors: [GetItemResponseInterceptor],
        }),
      ],
      providers: [],
    }).compileComponents();

    interceptor = TestBed.inject(GetItemResponseInterceptor);
    httpClient = TestBed.inject(HttpClient);
    apiCompositionService = TestBed.inject(ApiCompositionService);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should able to intercept request', async () => {
    spyOn(interceptor, 'visit');
    spyOn(httpClient, 'get').and.returnValue(of());

    await apiCompositionService.requestAsync(testEduGetItem);
    expect(interceptor.visit).toHaveBeenCalled();
  });
});
