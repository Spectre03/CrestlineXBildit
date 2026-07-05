import {
  json,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import type {Collection} from '@shopify/hydrogen/storefront-api-types';
import {
  Image,
  Pagination,
  getPaginationVariables,
  getSeoMeta,
} from '@shopify/hydrogen';

import {Grid} from '~/components/Grid';
import {Heading, PageHeader, Section} from '~/components/Text';
import {Link} from '~/components/Link';
import {Button} from '~/components/Button';
import {getImageLoadingPriority} from '~/lib/const';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';

const PAGINATION_SIZE = 4;

export const headers = routeHeaders;

export const loader = async ({
  request,
  context: {storefront},
}: LoaderFunctionArgs) => {
  const variables = getPaginationVariables(request, {pageBy: PAGINATION_SIZE});
  const {collections} = await storefront.query(COLLECTIONS_QUERY, {
    variables: {
      ...variables,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  const seo = seoPayload.listCollections({
    collections,
    url: request.url,
  });

  return json({collections, seo});
};

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Collections() {
  const {collections} = useLoaderData<typeof loader>();

  return (
    <>
      {/* Hero banner */}
      <div className="relative h-[40vh] flex items-end overflow-hidden bg-black -mt-nav">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&q=85"
          alt="Collections"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 pb-12">
          <p className="text-white/50 text-[10px] uppercase tracking-[0.4em] mb-3">Browse</p>
          <h1 className="font-serif text-white text-5xl md:text-6xl font-bold">Our Collections</h1>
        </div>
      </div>

      <div className="px-6 md:px-12 py-16">
        <Pagination connection={collections}>
          {({nodes, isLoading, PreviousLink, NextLink}) => (
            <>
              <div className="flex items-center justify-center mb-8">
                <Button as={PreviousLink} variant="secondary" width="full">
                  {isLoading ? 'Loading...' : 'Previous'}
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {nodes.map((collection, i) => (
                  <CollectionCard
                    collection={collection as Collection}
                    key={collection.id}
                    loading={getImageLoadingPriority(i, 2)}
                  />
                ))}
              </div>
              <div className="flex items-center justify-center mt-8">
                <Button as={NextLink} variant="secondary" width="full">
                  {isLoading ? 'Loading...' : 'Next'}
                </Button>
              </div>
            </>
          )}
        </Pagination>
      </div>
    </>
  );
}

function CollectionCard({
  collection,
  loading,
}: {
  collection: Collection;
  loading?: HTMLImageElement['loading'];
}) {
  return (
    <Link
      prefetch="viewport"
      to={`/collections/${collection.handle}`}
      className="relative overflow-hidden group aspect-[3/2] block"
    >
      <div className="absolute inset-0 bg-primary/10">
        {collection?.image && (
          <Image
            data={collection.image}
            aspectRatio="3/2"
            sizes="(max-width: 32em) 100vw, 45vw"
            loading={loading}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 p-8">
        <Heading as="h3" size="copy" className="text-white font-serif text-2xl font-bold tracking-wide">
          {collection.title}
        </Heading>
        <span className="text-white/60 text-[10px] uppercase tracking-widest mt-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Shop Now →
        </span>
      </div>
    </Link>
  );
}

const COLLECTIONS_QUERY = `#graphql
  query Collections(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        id
        title
        description
        handle
        seo {
          description
          title
        }
        image {
          id
          url
          width
          height
          altText
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;
