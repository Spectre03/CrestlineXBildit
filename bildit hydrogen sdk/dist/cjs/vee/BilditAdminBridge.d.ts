/**
 * Bundled-React admin build (USE_EXTERNAL_REACT=false).
 * The CDN no-react build externalizes `react` but not `react/jsx-runtime`, which
 * causes "Objects are not valid as a React child" in non-Next hosts like Hydrogen.
 */
export declare const DEFAULT_ADMIN_SCRIPT = "https://bildit-cdn.bilditon.com/cms-client-hydrogen/scripts/admin.js";
export interface BilditAdminBridgeProps {
    /** Override admin script URL (default: BILDIT Hydrogen CDN bundled admin.js). */
    adminScript?: string;
}
/**
 * VEE Live Editor bridge: listens for INJECT_SCRIPT from the CMS iframe parent
 * and loads the BILDIT admin script.
 */
export declare function BilditAdminBridge({ adminScript, }: BilditAdminBridgeProps): null;
