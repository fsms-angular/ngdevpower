import { Inject, NgModule } from '@angular/core';
import { ApiCompositionRootModule } from './api-composition-root-module';
import { FEATURE_APICOMPOSITION_SERVICES } from './models/api-composition-tokens';
import { ApiCompositionServices } from './models/internal-interfaces';

@NgModule()
export class ApiCompositionFeatureModule {
  constructor(
    private readonly root: ApiCompositionRootModule,
    @Inject(FEATURE_APICOMPOSITION_SERVICES)
    featureApiCompositionServices: ApiCompositionServices
  ) {
    this.root.addServices(featureApiCompositionServices);
  }
}
