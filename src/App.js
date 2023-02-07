import './styles.css';
import { useInterpret } from '@xstate/react';
import { ErrorBoundary } from '@sentry/react';
export default function App({ Context, machine }) {
  const appService = useInterpret(machine, {
    devTools: true
  });

  return (
    <Context.Provider value={{ appService }}>
      <ErrorBoundary
        fallback={({ error, componentStack, resetError, eventId }) => (
          <>
            <h1>An error has occured</h1>
            <h2>Error ID: {eventId}</h2>
            <pre>{error.toString()}</pre>
            <pre>{componentStack}</pre>
            <button
              onClick={() => {
                resetError();
              }}
            >
              Reset
            </button>
          </>
        )}
      >
        <div className="App">
          <h1>Hello CodeSandbox</h1>
          <h2>Start editing to see some magic happen!</h2>
        </div>
      </ErrorBoundary>
    </Context.Provider>
  );
}
