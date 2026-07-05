// CmsFullWidthFeature:v1.0 legacy=false
// @template v2

import React from 'react';

/**
 * @group Content
 * @type String
 */
const subtitle = 'Limited Edition';

/**
 * @group Content
 * @type String
 */
const title = 'The Signature\nCollection';

/**
 * @group Content
 * @type String
 */
const description = 'Timeless pieces designed to last a lifetime. Each item tells a story of craftsmanship.';

/**
 * @group Content
 * @type Image
 */
const imageUrl = {
  url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=85',
  alt: '',
};

/**
 * @group Button
 * @type String
 */
const buttonText = 'Discover Now';

/**
 * @group Button
 * @type String
 */
const buttonUrl = '/collections/all';

export default function CmsFullWidthFeature() {
  return (
    <div className="relative h-[70vh] overflow-hidden my-4 mx-4 md:mx-8 group">
      <img
        src={imageUrl.url}
        alt={subtitle}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/50 mb-5">{subtitle}</p>
        <h2 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-2xl whitespace-pre-line">
          {title}
        </h2>
        <p className="text-white/60 text-sm font-light tracking-widest max-w-md mb-10 leading-relaxed">
          {description}
        </p>
        <a
          href={buttonUrl}
          className="inline-block px-14 py-4 border border-white/60 text-white text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-white hover:text-black transition-all duration-500"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
}
