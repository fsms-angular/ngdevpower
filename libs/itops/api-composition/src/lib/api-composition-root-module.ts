import { Inject, NgModule } from '@angular/core';
import { ApiCompositionSources } from './models/api-composition-sources';
import { ROOT_APICOMPOSITION_SERVICES } from './models/api-composition-tokens';
import { ApiCompositionServices } from './models/internal-interfaces';

@NgModule()
export class ApiCompositionRootModule {
  constructor(
    private readonly sources: ApiCompositionSources,
    @Inject(ROOT_APICOMPOSITION_SERVICES)
    rootCompositionServices: ApiCompositionServices
  ) {
    this.addServices(rootCompositionServices);
  }

  addServices(services: ApiCompositionServices) {
    this.sources.addServices(services);
  }
}
