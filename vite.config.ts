import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {vitePlugin as remix} from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [
    hydrogen(),
    oxygen(),
    remix({
      presets: [hydrogen.preset()],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
    // Fix: BILDIT SDK imports preview.server.js in the client bundle.
    // Vite enforces strict server/client boundaries — this resolver intercepts
    // .server imports on the client side and redirects them to a lightweight mock.
    // Works on any hosting platform (Oxygen, Vercel, local builds).
    {
      name: 'resolve-bildit-server-on-client',
      enforce: 'pre',
      resolveId(source, importer, options) {
        if (!options.ssr && source.includes('.server')) {
          return path.resolve(__dirname, './react-router-mock.js');
        }
      }
    },
  ],
  resolve: {
    alias: {
      'react-router': path.resolve(__dirname, './react-router-mock.js'),
    },
  },
  ssr: {
    noExternal: [/@bildit-platform/, 'react-is'],
    optimizeDeps: {
      include: [
        'typographic-base',
        'react-is',
        '@bildit-platform/react-core',
        '@bildit-platform/hydrogen',
      ],
    },
  },
  optimizeDeps: {
    include: [
      'clsx',
      '@headlessui/react',
      'typographic-base',
      'react-intersection-observer',
      'react-use/esm/useScroll',
      'react-use/esm/useDebounce',
      'react-use/esm/useWindowScroll',
      'react-is',
      '@bildit-platform/react-core',
      '@bildit-platform/hydrogen',
    ],
  },
  build: {
    sourcemap: false,
    // Allow a strict Content-Security-Policy
    // withtout inlining assets as base64:
    assetsInlineLimit: 0,
  },
});
