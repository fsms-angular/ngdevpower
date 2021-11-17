import { ApiCompositionModuleSettings } from '../../interfaces';

export function traceServiceCountForApiKey({
  requestInterceptors = [],
  requestHandlers = [],
  responseInterceptors = [],
  apiKey,
  logger,
  settings,
}) {
  if (!isTraceEnabled(settings)) {
    return;
  }
  const msg = `Branding.ApiComposition:Trace--> ${requestInterceptors.length} RequestInterceptors, ${requestHandlers.length} RequestHandlers, ${responseInterceptors.length} ResponseInterceptors are found for ApiName: ${apiKey}`;

  logger.scriptVerbose(msg);
  console.log(msg);
}

function isTraceEnabled({ isTracingOn }: ApiCompositionModuleSettings) {
  const isTracingEnabledFromServer = isTracingOn;

  return isTracingEnabledFromServer;
}
