import { ApiCompositionServiceDefinition } from '../interfaces';
import { API_COMPOSITION_METADATA_KEY } from './api-composition-tokens';

export function getApiCompositionServiceMetadata<T>(
  instance: T
): ApiCompositionServiceDefinition {
  const y = getSourceForInstance(instance);
  return y.constructor[API_COMPOSITION_METADATA_KEY];
}

export function getSourceForInstance<T>(instance: T): T {
  return Object.getPrototypeOf(instance);
}

export function getDecoratorMetadata<T, V>(instance: T, key: string): V {
  const y = getSourceForInstance(instance);
  return y.constructor[key] as V;
}
