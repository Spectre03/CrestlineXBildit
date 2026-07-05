import {RemixBrowser} from '@remix-run/react';
import {startTransition, StrictMode} from 'react';
import {hydrateRoot} from 'react-dom/client';
import {ensureHostReactGlobals, registerCmsDependencies} from '@bildit-platform/hydrogen';

// Initialize BILDIT dynamic component globals
ensureHostReactGlobals();
registerCmsDependencies();

if (!window.location.origin.includes('webcache.googleusercontent.com')) {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>,
    );
  });
}
