# @bildit-platform/hydrogen

Shopify Hydrogen adapter for BILDIT CMS banner rendering and VEE Live Editor integration.

Built on [`@bildit-platform/react-core`](../react-core). Uses **React Router** and **@shopify/hydrogen** — no `next/*` shims.

## Install

```bash
pnpm add @bildit-platform/hydrogen
```

Peer dependencies: `react` 18+, `react-dom`, `react-router` 7+, `@shopify/hydrogen` 2025+.

## Quick start

See [example/README.md](./example/README.md) for full VEE setup.

```jsx
// entry.client.jsx
import { ensureHostReactGlobals, registerCmsDependencies } from '@bildit-platform/hydrogen';
ensureHostReactGlobals();
registerCmsDependencies();

// root loader + layout
import { getBannersForRequest, BilditRoot, SlotPlaceholder } from '@bildit-platform/hydrogen';

const banners = await getBannersForRequest(request, env);

<BilditRoot banners={banners}>
  <SlotPlaceholder slotId="home-hero" />
</BilditRoot>
```

## Exports

| Category | Exports |
|----------|---------|
| Rendering | `BilditProvider`, `BilditRoot`, placeholders, hooks, types |
| VEE / admin | `BilditAdminBridge`, `ensureHostReactGlobals`, `registerCmsDependencies` |
| Server | `getBannersForRequest`, `getPreviewDateFromRequest`, CSP helpers |
| Config | `hydrogenDependenciesConfig` |

## Publish order

When releasing SDK packages: **react-core → nextjs → hydrogen**.
