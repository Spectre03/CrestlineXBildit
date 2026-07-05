import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {Link} from '~/components/Link';
import {getImageLoadingPriority, PAGINATION_SIZE} from '~/lib/const';

const BLOG_HANDLE = 'Journal';

const FALLBACK_ARTICLES = [
  {
    id: '1',
    handle: 'style-guide-2026',
    title: 'The 2026 Style Guide: What to Wear This Season',
    publishedAt: 'March 1, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
  },
  {
    id: '2',
    handle: 'behind-the-brand',
    title: 'Behind the Brand: How Crestline Was Built',
    publishedAt: 'February 20, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
  },
  {
    id: '3',
    handle: 'sustainable-fashion',
    title: 'Why We Chose Sustainable Materials From Day One',
    publishedAt: 'February 10, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    id: '4',
    handle: 'new-arrivals-spring',
    title: 'Spring Drop: Our Newest Arrivals Are Here',
    publishedAt: 'January 28, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
  },
  {
    id: '5',
    handle: 'how-to-style',
    title: 'How to Style One Piece Five Different Ways',
    publishedAt: 'January 15, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
  },
  {
    id: '6',
    handle: 'member-spotlight',
    title: 'Member Spotlight: Real People, Real Style',
    publishedAt: 'January 5, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&q=80',
  },
];

export async function loader({context}: LoaderFunctionArgs) {
  try {
    const {blog} = await context.storefront.query(BLOGS_QUERY, {
      variables: {
        blogHandle: BLOG_HANDLE,
        pageBy: PAGINATION_SIZE,
        language: context.storefront.i18n.language,
      },
    });

    if (blog?.articles?.edges?.length > 0) {
      const articles = blog.articles.edges.map(({node}: any) => ({
        id: node.id,
        handle: node.handle,
        title: node.title,
        publishedAt: node.publishedAt,
        imageUrl: node.image?.url ?? '',
      }));
      return json({articles});
    }
  } catch (_) {}

  return json({articles: FALLBACK_ARTICLES});
}

export function meta() {
  return [{title: 'Journal | Crestline Commerce'}];
}

export default function Journals() {
  const {articles} = useLoaderData<typeof loader>();

  return (
    <>
      {/* Hero banner */}
      <div className="relative h-[40vh] flex items-end overflow-hidden bg-black -mt-nav">
        <img
          src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=1920&q=85"
          alt="Journal"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 pb-12">
          <p className="text-white/50 text-[10px] uppercase tracking-[0.4em] mb-3">
            Stories & Insights
          </p>
          <h1 className="font-serif text-white text-5xl md:text-6xl font-bold">
            The Journal
          </h1>
        </div>
      </div>

      <div className="px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article: any, i: number) => (
            <Link
              to={`/journal/${article.handle}`}
              key={article.id}
              className="group block"
            >
              <div className="overflow-hidden aspect-[3/2] bg-primary/5 mb-5">
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    loading={getImageLoadingPriority(i, 2)}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
              <p className="text-primary/40 text-[10px] uppercase tracking-widest mb-2">
                {article.publishedAt}
              </p>
              <h2 className="font-serif text-xl font-bold leading-snug group-hover:opacity-60 transition-opacity duration-300">
                {article.title}
              </h2>
              <span className="inline-block mt-3 text-[10px] uppercase tracking-widest border-b border-primary pb-0.5">
                Read More
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

const BLOGS_QUERY = `#graphql
query Blog(
  $language: LanguageCode
  $blogHandle: String!
  $pageBy: Int!
) @inContext(language: $language) {
  blog(handle: $blogHandle) {
    articles(first: $pageBy) {
      edges {
        node {
          handle
          id
          title
          publishedAt
          image { url altText }
        }
      }
    }
  }
}
`;
