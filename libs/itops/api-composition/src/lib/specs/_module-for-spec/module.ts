import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrandingCoreApiCompositionModule } from '../../branding-core-api-composition.module';
import { GetItemRequestHandler } from './item-get-request-handler';
import { GetItemRequestInterceptor } from './item-get-request-interceptor';
import { GetItemResponseInterceptor } from './item-get-response-interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrandingCoreApiCompositionModule.forRoot({}),
    BrandingCoreApiCompositionModule.forFeature({
      requestHandlers: [GetItemRequestHandler],
      requestInterceptors: [GetItemRequestInterceptor],
      responseInterceptors: [GetItemResponseInterceptor],
    }),
  ],
  declarations: [],
  exports: [],
})
export class EducationSpecModule {}
