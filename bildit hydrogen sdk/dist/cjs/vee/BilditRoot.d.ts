import { type ReactNode } from 'react';
import type { BannerType } from '@bildit-platform/react-core';
import { type BilditAdminBridgeProps } from './BilditAdminBridge';
export interface BilditRootProps extends BilditAdminBridgeProps {
    banners?: BannerType[];
    children: ReactNode;
}
/**
 * BilditProvider injects a <style> tag that SSR-escapes quotes differently than
 * the client, causing hydration mismatches. Mount the provider after hydration.
 */
export declare function BilditRoot({ banners, children, adminScript, }: BilditRootProps): import("react/jsx-runtime").JSX.Element;
