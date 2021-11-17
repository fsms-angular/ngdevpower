import { LogService } from '@branding/core/log';
import { ApiCompositionModuleSettings } from '../../interfaces';
import { getApiCompositionServiceMetadata } from '../../models/metadata';

export function traceBeforeExecuting(
  interceptor: any,
  logService: LogService,
  settings: ApiCompositionModuleSettings,

  message: string
) {
  const { isTracingOn, serviceName } = getApiCompositionServiceMetadata(
    interceptor
  );

  if (!isTraceEnabled(isTracingOn, settings.isTracingOn)) {
    return;
  }

  const msg = `Branding.ApiComposition:Trace-->${serviceName}: ${message}`;

  logService.scriptVerbose(msg);

  console.log(msg);
}

function isTraceEnabled(
  isTracingOnAtServiceLevel: boolean,
  isTracingOnFromServer: boolean
) {
  if (isTracingOnFromServer) {
    return isTracingOnAtServiceLevel;
  }

  return false;
}
