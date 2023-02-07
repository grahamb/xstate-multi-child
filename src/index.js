import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { inspect } from '@xstate/inspect';
import App from './App';
import selfServeMachine, {
  SelfServeMachineContext
} from './machines/selfServeMachine.js';

Sentry.init({
  dsn: 'https://fad7503bd7ca48559c077a8acaecb6d9@sentry.its.sfu.ca/19',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0
});

// inspect({
//   url: "https://statecharts.io/inspect",
//   iframe: false
// });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App Context={SelfServeMachineContext} machine={selfServeMachine} />
  </StrictMode>
);
