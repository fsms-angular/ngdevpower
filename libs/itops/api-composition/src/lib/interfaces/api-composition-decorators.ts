import { ApiCompositionServiceDefinition } from '.';
import { API_COMPOSITION_METADATA_KEY } from '../models/api-composition-tokens';

export const DEFAULT_MESSAGEHANDLER_CONFIG: ApiCompositionServiceDefinition = {
  apiKeys: [],
  serviceName: '',
  isTracingOn: true,
};

function generalDecorator(options: ApiCompositionServiceDefinition) {
  return function construct(target: any) {
    const metadata: ApiCompositionServiceDefinition = {
      ...DEFAULT_MESSAGEHANDLER_CONFIG,
      ...options,
    };

    Object.defineProperty(target, API_COMPOSITION_METADATA_KEY, {
      value: metadata,
    });
  };
}

export function RequestInterceptor(options: ApiCompositionServiceDefinition) {
  return generalDecorator(options);
}

export function ResponseInterceptor(options: ApiCompositionServiceDefinition) {
  return generalDecorator(options);
}

export function RequestHandler(options: ApiCompositionServiceDefinition) {
  return generalDecorator(options);
}
