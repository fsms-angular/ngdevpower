import { InjectionToken, Type } from '@angular/core';

export const API_COMPOSITION_METADATA_KEY =
  '__@fsms-angular/itops/apicomposition__';

export const ROOT_APICOMPOSITION_SERVICES = new InjectionToken<Type<any>[]>(
  '@fsms-angular/itops/apicomposition Root Api Composition Services'
);

export const FEATURE_APICOMPOSITION_SERVICES = new InjectionToken<Type<any>[]>(
  '@fsms-angular/itops/apicomposition Feature Api Composition Services'
);

//#region REQUEST HANDLERS

export const _ROOT_REQUESTHANDLERS = new InjectionToken<Type<any>[]>(
  '@fsms-angular/itops/apicomposition Internal Root Request Handlers'
);

export const ROOT_REQUESTHANDLERS = new InjectionToken<Type<any>[]>(
  '@fsms-angular/itops/apicomposition Root Request Handlers'
);

export const _FEATURE_REQUESTHANDLERS = new InjectionToken<Type<any>[]>(
  '@fsms-angular/itops/apicomposition Internal Feature Request Handlers'
);

export const FEATURE_REQUESTHANDLERS = new InjectionToken<any[][]>(
  '@fsms-angular/itops/apicomposition Feature Request Handlers'
);

//#endregion

//#region REQUEST INTERCEPTORS

export const _ROOT_REQUESTINTERCEPTORS = new InjectionToken<Type<any>[]>(
  '@fsms-angular/itops/apicomposition Internal Root Request Interceptors'
);

export const ROOT_REQUESTINTERCEPTORS = new InjectionToken<Type<any>[]>(
  '@fsms-angular/itops/apicomposition Root Request Interceptors'
);

export const _FEATURE_REQUESTINTERCEPTORS = new InjectionToken<Type<any>[]>(
  '@fsms-angular/itops/apicomposition Internal Feature Request Interceptors'
);

export const FEATURE_REQUESTINTERCEPTORS = new InjectionToken<any[][]>(
  '@fsms-angular/itops/apicomposition Feature Request Interceptors'
);

//#endregion

//#region RESPONSE INTERCEPTORS

export const _ROOT_RESPONSEINTERCEPTORS = new InjectionToken<Type<any>[]>(
  '@fsms-angular/itops/apicomposition Internal Root Response Interceptors'
);

export const ROOT_RESPONSEINTERCEPTORS = new InjectionToken<Type<any>[]>(
  '@fsms-angular/itops/apicomposition Root Response Interceptors'
);

export const _FEATURE_RESPONSEINTERCEPTORS = new InjectionToken<Type<any>[]>(
  '@fsms-angular/itops/apicomposition Internal Feature Response Interceptors'
);

export const FEATURE_RESPONSEINTERCEPTORS = new InjectionToken<any[][]>(
  '@fsms-angular/itops/apicomposition Feature Response Interceptors'
);

//#endregion
