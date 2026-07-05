/**
 * Hydrogen merges custom frameAncestors with the default `'none'`, which still
 * blocks all framing. Replace the directive so VEE can iframe the storefront.
 */
export declare function allowBilditIframeEmbedding(header: string): string;
/**
 * Extend Hydrogen's CSP — do not replace Shopify defaults.
 * Passing only BILDIT domains previously dropped cdn.shopify.com and 'self'.
 */
export declare const bilditCspDirectives: {
    connectSrc: string[];
    scriptSrc: string[];
    imgSrc: string[];
};
