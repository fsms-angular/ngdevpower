import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppConfigTestSetup } from '@branding/core/config';
import { BrandingCoreLogTestingModule } from '@branding/core/log';
import { BrandingCoreApiCompositionModule } from '../../branding-core-api-composition.module';
import { ApiCompositionService } from '../../services/api-composition.service';
import { GetItemRequestHandler } from '../_module-for-spec/item-get-request-handler';
import { GetItemRequestInterceptor } from '../_module-for-spec/item-get-request-interceptor';
import { GetItemResponseInterceptor } from '../_module-for-spec/item-get-response-interceptor';

describe('@api-compostion@testing-service: Given api-composition-service', () => {
  let apiCompositionService: ApiCompositionService;
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
    apiCompositionService = TestBed.inject(ApiCompositionService);
  });

  describe('for get requests', () => {
    describe('when no query handlers defined', () => {
      it('when making a query an error will be thrown', async () => {
        try {
          await apiCompositionService.requestAsync('any', {});
        } catch (e) {
          expect(e.message).toBe(
            'Cannot find a valid requestHandler or factory for "any"'
          );
        }
      });
    });
  });
});
