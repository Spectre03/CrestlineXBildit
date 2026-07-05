import {
  defer,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {getSeoMeta} from '@shopify/hydrogen';

import {Hero} from '~/components/Hero';
import {FeaturedCollections} from '~/components/FeaturedCollections';
import {ProductSwimlane} from '~/components/ProductSwimlane';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {getHeroPlaceholder} from '~/lib/placeholders';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import {getBannersForRequest} from '@bildit-platform/hydrogen/server';
import {BilditRoot, SlotPlaceholder} from '@bildit-platform/hydrogen';
import CmsCinematicHero from '~/components/CmsCinematicHero';
import CmsMarqueeTicker from '~/components/CmsMarqueeTicker';
import CmsSplitBanner from '~/components/CmsSplitBanner';
import CmsFullWidthFeature from '~/components/CmsFullWidthFeature';

export const headers = routeHeaders;

export async function loader(args: LoaderFunctionArgs) {
  const {params, context} = args;
  const {language, country} = context.storefront.i18n;

  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the locale URL param is defined, yet we still are on `EN-US`
    // the the locale param must be invalid, send to the 404 page
    throw new Response(null, {status: 404});
  }

  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, request}: LoaderFunctionArgs) {
  const [{shop, hero}, banners] = await Promise.all([
    context.storefront.query(HOMEPAGE_SEO_QUERY, {
      variables: {handle: 'freestyle'},
    }),
    getBannersForRequest(request, context.env).catch((err) => {
      console.error('BILDIT banners fetch failed:', err);
      return [];
    }),
  ]);

  return {
    shop,
    primaryHero: hero,
    seo: seoPayload.home({url: request.url}),
    banners: banners || [],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const {language, country} = context.storefront.i18n;

  const featuredProducts = context.storefront
    .query(HOMEPAGE_FEATURED_PRODUCTS_QUERY, {
      variables: {
        /**
         * Country and language properties are automatically injected
         * into all queries. Passing them is unnecessary unless you
         * want to override them from the following default:
         */
        country,
        language,
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    });

  const secondaryHero = context.storefront
    .query(COLLECTION_HERO_QUERY, {
      variables: {
        handle: 'backcountry',
        country,
        language,
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    });

  const featuredCollections = context.storefront
    .query(FEATURED_COLLECTIONS_QUERY, {
      variables: {
        country,
        language,
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    });

  const tertiaryHero = context.storefront
    .query(COLLECTION_HERO_QUERY, {
      variables: {
        handle: 'winter-2022',
        country,
        language,
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    });

  return {
    featuredProducts,
    secondaryHero,
    featuredCollections,
    tertiaryHero,
  };
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Homepage() {
  const {
    primaryHero,
    secondaryHero,
    tertiaryHero,
    featuredCollections,
    featuredProducts,
    banners,
  } = useLoaderData<typeof loader>();

  const skeletons = getHeroPlaceholder([{}, {}, {}]);

  return (
    <BilditRoot banners={banners || []}>
      {/* ── CINEMATIC HERO SLOTS ── */}
      <SlotPlaceholder slotId="home-hero" fallback={<CmsCinematicHero />} />

      {/* ── MARQUEE TICKER SLOTS ── */}
      <SlotPlaceholder slotId="home-marquee" fallback={<CmsMarqueeTicker />} />

      {/* ── FEATURED PRODUCTS ── */}
      {featuredProducts && (
        <Suspense>
          <Await resolve={featuredProducts}>
            {(response) => {
              if (!response?.products?.nodes) return <></>;
              return (
                <div className="px-6 md:px-12 py-20">
                  <div className="flex items-end justify-between mb-12">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.35em] text-primary/40 mb-3">Curated Selection</p>
                      <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">Featured<br />Products</h2>
                    </div>
                    <a href="/products" className="text-[11px] uppercase tracking-widest border-b border-primary pb-1 hover:opacity-60 transition-opacity duration-300 hidden md:block">
                      View All
                    </a>
                  </div>
                  <ProductSwimlane
                    products={response.products}
                    title=""
                    count={4}
                  />
                </div>
              );
            }}
          </Await>
        </Suspense>
      )}

      {/* ── SPLIT BANNER SLOTS ── */}
      <SlotPlaceholder slotId="home-split-banner" fallback={<CmsSplitBanner />} />

      {/* ── FULL WIDTH FEATURE BANNER SLOTS ── */}
      <SlotPlaceholder slotId="home-full-width-feature" fallback={<CmsFullWidthFeature />} />

      {/* ── COLLECTIONS GRID ── */}
      {featuredCollections && (
        <Suspense>
          <Await resolve={featuredCollections}>
            {(response) => {
              if (!response?.collections?.nodes) return <></>;
              const cols = response.collections.nodes.filter((c: any) => c.image);
              if (!cols.length) return <></>;
              return (
                <div className="px-4 md:px-8 py-16">
                  <div className="text-center mb-12">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-primary/40 mb-3">Browse By Category</p>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold">Our Collections</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {cols.map((collection: any) => (
                      <a key={collection.id} href={`/collections/${collection.handle}`} className="relative overflow-hidden group aspect-[3/4]">
                        {collection.image && (
                          <img
                            src={collection.image.url}
                            alt={collection.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-500" />
                        <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 text-white text-center">
                          <h3 className="font-serif text-xl font-bold tracking-wide mb-2">{collection.title}</h3>
                          <span className="text-[10px] uppercase tracking-[0.25em] text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Shop Now</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            }}
          </Await>
        </Suspense>
      )}

      {/* ── BRAND VALUES STRIP ── */}
      <div className="bg-primary text-contrast py-16 px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto text-center">
          {[
            {icon: '◈', title: 'Premium Quality', desc: 'Every piece crafted to the highest standard'},
            {icon: '◎', title: 'Free Shipping', desc: 'On all orders over $150 worldwide'},
            {icon: '◇', title: 'Easy Returns', desc: '30-day hassle-free return policy'},
            {icon: '◉', title: 'Exclusive Access', desc: 'Members unlock early drops & deals'},
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-3">
              <span className="text-2xl text-white/40">{item.icon}</span>
              <h4 className="font-serif text-sm font-bold uppercase tracking-widest">{item.title}</h4>
              <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECONDARY HERO FROM SHOPIFY ── */}
      {secondaryHero && (
        <Suspense fallback={<Hero {...skeletons[1]} />}>
          <Await resolve={secondaryHero}>
            {(response) => {
              if (!response?.hero) return <></>;
              return <Hero {...response.hero} />;
            }}
          </Await>
        </Suspense>
      )}

      {/* ── TERTIARY HERO FROM SHOPIFY ── */}
      {tertiaryHero && (
        <Suspense fallback={<Hero {...skeletons[2]} />}>
          <Await resolve={tertiaryHero}>
            {(response) => {
              if (!response?.hero) return <></>;
              return <Hero {...response.hero} />;
            }}
          </Await>
        </Suspense>
      )}

      {/* ── NEWSLETTER SECTION ── */}
      <div className="relative overflow-hidden py-24 px-6 text-center">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="relative z-10 max-w-xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.4em] text-primary/40 mb-4">Stay Connected</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight">Join the Inner Circle</h2>
          <p className="text-primary/50 text-sm font-light tracking-wide mb-10 leading-relaxed">
            Get early access to new drops, exclusive offers, and members-only events.
          </p>
          <div className="flex gap-0 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 border border-primary/20 bg-transparent text-sm font-light tracking-wide placeholder:text-primary/30 focus:outline-none focus:border-primary/60 transition-colors duration-300"
            />
            <button className="px-8 py-4 bg-primary text-contrast text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-primary/80 transition-colors duration-300 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </BilditRoot>
  );
}

const COLLECTION_CONTENT_FRAGMENT = `#graphql
  fragment CollectionContent on Collection {
    id
    handle
    title
    descriptionHtml
    heading: metafield(namespace: "hero", key: "title") {
      value
    }
    byline: metafield(namespace: "hero", key: "byline") {
      value
    }
    cta: metafield(namespace: "hero", key: "cta") {
      value
    }
    spread: metafield(namespace: "hero", key: "spread") {
      reference {
        ...Media
      }
    }
    spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
      reference {
        ...Media
      }
    }
  }
  ${MEDIA_FRAGMENT}
` as const;

const HOMEPAGE_SEO_QUERY = `#graphql
  query seoCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
    shop {
      name
      description
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
` as const;

const COLLECTION_HERO_QUERY = `#graphql
  query heroCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
` as const;

// @see: https://shopify.dev/api/storefront/current/queries/products
export const HOMEPAGE_FEATURED_PRODUCTS_QUERY = `#graphql
  query homepageFeaturedProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 8) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;

// @see: https://shopify.dev/api/storefront/current/queries/collections
export const FEATURED_COLLECTIONS_QUERY = `#graphql
  query homepageFeaturedCollections($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(
      first: 4,
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
` as const;
