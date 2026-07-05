import type { BannerType } from '@bildit-platform/react-core';
export interface BilditEnv {
    BILDIT_API_URL?: string;
    BILDIT_API_KEY?: string;
}
export declare function getBanners(location: string, previewDate: string | undefined, env: BilditEnv): Promise<BannerType[]>;
/** Fetch banners for a Hydrogen root loader Request. */
export declare function getBannersForRequest(request: Request, env: BilditEnv): Promise<BannerType[]>;
