import {
  json,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import invariant from 'tiny-invariant';
import {
  Pagination,
  getPaginationVariables,
  getSeoMeta,
} from '@shopify/hydrogen';

import {PageHeader, Section} from '~/components/Text';
import {ProductCard} from '~/components/ProductCard';
import {Grid} from '~/components/Grid';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {getImageLoadingPriority} from '~/lib/const';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';

const PAGE_BY = 8;

export const headers = routeHeaders;

export async function loader({
  request,
  context: {storefront},
}: LoaderFunctionArgs) {
  const variables = getPaginationVariables(request, {pageBy: PAGE_BY});

  const data = await storefront.query(ALL_PRODUCTS_QUERY, {
    variables: {
      ...variables,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  invariant(data, 'No data returned from Shopify API');

  const seo = seoPayload.collection({
    url: request.url,
    collection: {
      id: 'all-products',
      title: 'All Products',
      handle: 'products',
      descriptionHtml: 'All the store products',
      description: 'All the store products',
      seo: {
        title: 'All Products',
        description: 'All the store products',
      },
      metafields: [],
      products: data.products,
      updatedAt: '',
    },
  });

  return json({
    products: data.products,
    seo,
  });
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function AllProducts() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <>
      {/* Premium hero banner */}
      <div className="relative h-[40vh] flex items-end overflow-hidden bg-black -mt-nav">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=85"
          alt="All Products"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 pb-12">
          <p className="text-white/50 text-[10px] uppercase tracking-[0.4em] mb-3">Everything</p>
          <h1 className="font-serif text-white text-5xl md:text-6xl font-bold">All Products</h1>
        </div>
      </div>

      <div className="px-6 md:px-12 py-12">
        <Pagination connection={products}>
          {({nodes, isLoading, NextLink, PreviousLink}) => (
            <>
              <div className="flex items-center justify-center mb-8">
                <PreviousLink className="inline-block font-medium text-center py-3 px-8 border border-primary/20 text-primary text-xs uppercase tracking-widest hover:bg-primary hover:text-contrast transition-colors duration-300">
                  {isLoading ? 'Loading...' : 'Previous'}
                </PreviousLink>
              </div>
              <Grid data-test="product-grid">
                {nodes.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    loading={getImageLoadingPriority(i)}
                  />
                ))}
              </Grid>
              <div className="flex items-center justify-center mt-8">
                <NextLink className="inline-block font-medium text-center py-3 px-8 border border-primary/20 text-primary text-xs uppercase tracking-widest hover:bg-primary hover:text-contrast transition-colors duration-300">
                  {isLoading ? 'Loading...' : 'Load More'}
                </NextLink>
              </div>
            </>
          )}
        </Pagination>
      </div>
    </>
  );
}

const ALL_PRODUCTS_QUERY = `#graphql
  query AllProducts(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;
