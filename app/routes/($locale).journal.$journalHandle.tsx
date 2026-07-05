import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import invariant from 'tiny-invariant';

const BLOG_HANDLE = 'journal';

const FALLBACK_ARTICLES: Record<string, {title: string; publishedAt: string; author: string; image: string; contentHtml: string}> = {
  'style-guide-2026': {
    title: 'The 2026 Style Guide: What to Wear This Season',
    publishedAt: 'March 1, 2026',
    author: 'Crestline Team',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=85',
    contentHtml: `<p>Each season brings a new opportunity to redefine your personal style. This year, we're seeing a shift toward timeless, investment pieces that transcend trends — quality over quantity, always.</p><h2>The Core Palette</h2><p>Neutrals remain dominant: warm taupes, deep navies, crisp whites, and rich charcoals. These tones work across every occasion and layer beautifully together.</p><h2>Key Pieces for 2026</h2><p>The oversized blazer, the relaxed trouser, the minimalist knit — these are the pillars of a well-built wardrobe this season. Each piece earns its place through versatility and longevity.</p><h2>The Investment Mindset</h2><p>We encourage our community to buy less, but better. A single exceptional piece worn 100 times is far more sustainable — and stylish — than 10 pieces worn once.</p>`,
  },
  'behind-the-brand': {
    title: 'Behind the Brand: How Crestline Was Built',
    publishedAt: 'February 20, 2026',
    author: 'Crestline Team',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=85',
    contentHtml: `<p>Crestline Commerce was born from a simple frustration: why was it so difficult to find clothing that was both beautifully designed and built to last? That question became our foundation.</p><h2>The Beginning</h2><p>We started with a small collection of five pieces, each obsessively designed and refined over eight months before launch. The response from our first customers told us we were onto something real.</p><h2>Our Design Philosophy</h2><p>Every piece in our collection is designed to work hard. That means clean lines, considered proportions, and materials that improve with wear. Nothing disposable. Nothing trend-chasing.</p><h2>What's Next</h2><p>We're expanding into new categories this year, always with the same commitment: premium quality, honest pricing, and design that respects your intelligence.</p>`,
  },
  'sustainable-fashion': {
    title: 'Why We Chose Sustainable Materials From Day One',
    publishedAt: 'February 10, 2026',
    author: 'Crestline Team',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
    contentHtml: `<p>Sustainability wasn't a marketing decision for us. It was a values decision, made before we sold a single item.</p><h2>The Materials We Use</h2><p>We source certified organic cotton, recycled wool blends, and TENCEL™ lyocell — materials chosen for their environmental profile and their feel against the skin. Every supplier is audited annually.</p><h2>Packaging</h2><p>All our packaging is 100% recycled and recyclable. Our shipping materials are plastic-free. It's a small thing, but it matters to us.</p><h2>The Long Game</h2><p>The most sustainable garment is the one you keep forever. That's why durability is non-negotiable in everything we make.</p>`,
  },
  'new-arrivals-spring': {
    title: 'Spring Drop: Our Newest Arrivals Are Here',
    publishedAt: 'January 28, 2026',
    author: 'Crestline Team',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=85',
    contentHtml: `<p>The spring collection is here, and it might be our best work yet. Lighter fabrics, elevated construction, and a palette that captures the energy of the season.</p><h2>What's New</h2><p>This drop includes our most-requested category: outerwear. Lightweight layers designed for the transitional weeks when you're never quite sure what the day will bring.</p><h2>The Details</h2><p>Every piece ships with a care card explaining exactly how to maintain it. We want these items in your wardrobe for years, not months.</p>`,
  },
  'how-to-style': {
    title: 'How to Style One Piece Five Different Ways',
    publishedAt: 'January 15, 2026',
    author: 'Crestline Team',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=85',
    contentHtml: `<p>The mark of a truly great garment is its versatility. Today we're taking one of our bestselling pieces and showing you exactly how far it can stretch across five distinct occasions.</p><h2>Look 1: The Office</h2><p>Pair with tailored trousers and clean white trainers. Add a structured bag. Done.</p><h2>Look 2: Weekend Casual</h2><p>Layer over a simple tee with straight-leg jeans. Let it breathe.</p><h2>Look 3: Evening Out</h2><p>Dress it up with wide-leg trousers and a minimal heel. One statement earring, nothing more.</p><h2>Look 4: Travel</h2><p>Comfort and polish together. Pair with comfortable shoes and a crossbody you can move with.</p><h2>Look 5: Layered</h2><p>Wear it under a long coat in the colder months. The versatility extends across seasons.</p>`,
  },
  'member-spotlight': {
    title: 'Member Spotlight: Real People, Real Style',
    publishedAt: 'January 5, 2026',
    author: 'Crestline Team',
    image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=1200&q=85',
    contentHtml: `<p>We started the Member Spotlight series because we believe style is personal — and our community wears our pieces in ways that constantly inspire us.</p><h2>This Month's Feature</h2><p>We spoke to six members across four countries about how they've built their wardrobes, what they look for in a piece before buying, and why they keep coming back to Crestline.</p><h2>The Common Thread</h2><p>Every person we spoke to said the same thing in different words: they're tired of buying things that fall apart. They want clothes that last, look good, and don't require a manual to style.</p><p>That's exactly what we're here for.</p>`,
  },
};

export async function loader({params, context}: LoaderFunctionArgs) {
  invariant(params.journalHandle, 'Missing journal handle');

  // Try Shopify API first
  try {
    const {blog} = await context.storefront.query(ARTICLE_QUERY, {
      variables: {
        blogHandle: BLOG_HANDLE,
        articleHandle: params.journalHandle,
        language: context.storefront.i18n.language,
      },
    });

    if (blog?.articleByHandle) {
      const a = blog.articleByHandle;
      return json({
        title: a.title,
        contentHtml: a.contentHtml,
        publishedAt: a.publishedAt,
        author: a.author?.name ?? '',
        imageUrl: a.image?.url ?? '',
        imageAlt: a.image?.altText ?? a.title,
      });
    }
  } catch (_) {}

  // Fall back to hardcoded articles
  const fallback = FALLBACK_ARTICLES[params.journalHandle];
  if (!fallback) throw new Response('Not found', {status: 404});

  return json({
    title: fallback.title,
    contentHtml: fallback.contentHtml,
    publishedAt: fallback.publishedAt,
    author: fallback.author,
    imageUrl: fallback.image,
    imageAlt: fallback.title,
  });
}

export function meta({data}: {data: any}) {
  return [{title: `${data?.title ?? 'Article'} | Crestline Commerce`}];
}

export default function Article() {
  const {title, contentHtml, publishedAt, author, imageUrl, imageAlt} =
    useLoaderData<typeof loader>();

  return (
    <>
      {/* Hero */}
      <div className="relative h-[55vh] flex items-end overflow-hidden bg-black -mt-nav">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 pb-12 max-w-4xl">
          <p className="text-white/50 text-[10px] uppercase tracking-[0.4em] mb-3">
            The Journal &nbsp;·&nbsp; {publishedAt}
          </p>
          <h1 className="font-serif text-white text-4xl md:text-5xl font-bold leading-tight">
            {title}
          </h1>
          {author && (
            <p className="text-white/40 text-xs uppercase tracking-widest mt-4">
              By {author}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <article className="max-w-2xl mx-auto px-6 py-16">
        <div
          dangerouslySetInnerHTML={{__html: contentHtml}}
          className="prose prose-lg max-w-none text-primary/80 leading-relaxed font-light"
        />
        <div className="mt-16 pt-8 border-t border-primary/10">
          <a
            href="/journal"
            className="text-[10px] uppercase tracking-widest border-b border-primary pb-0.5 hover:opacity-60 transition-opacity duration-300"
          >
            &larr; Back to Journal
          </a>
        </div>
      </article>
    </>
  );
}

const ARTICLE_QUERY = `#graphql
  query ArticleDetails(
    $language: LanguageCode
    $blogHandle: String!
    $articleHandle: String!
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        publishedAt
        author: authorV2 { name }
        image { id altText url width height }
      }
    }
  }
`;
