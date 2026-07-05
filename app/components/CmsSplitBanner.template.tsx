// CmsSplitBanner:v1.0 legacy=false
// @template v2

import React from 'react';

/**
 * @group Left Banner
 * @type Image
 */
const leftImageUrl = {
  url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80',
  alt: '',
};

/**
 * @group Left Banner
 * @type String
 */
const leftSubtitle = 'Women';

/**
 * @group Left Banner
 * @type String
 */
const leftTitle = 'New Season\nArrivals';

/**
 * @group Left Banner
 * @type String
 */
const leftButtonText = 'Shop Women';

/**
 * @group Left Banner
 * @type String
 */
const leftButtonUrl = '/collections/all';

/**
 * @group Right Banner
 * @type Image
 */
const rightImageUrl = {
  url: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=900&q=80',
  alt: '',
};

/**
 * @group Right Banner
 * @type String
 */
const rightSubtitle = 'Men';

/**
 * @group Right Banner
 * @type String
 */
const rightTitle = 'Essential\nCollection';

/**
 * @group Right Banner
 * @type String
 */
const rightButtonText = 'Shop Men';

/**
 * @group Right Banner
 * @type String
 */
const rightButtonUrl = '/collections/all';

export default function CmsSplitBanner() {
  return (
    <div className="grid md:grid-cols-2 gap-0 my-4 mx-4 md:mx-8">
      <div className="relative h-[60vh] overflow-hidden group">
        <img
          src={leftImageUrl.url}
          alt={leftSubtitle}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-500" />
        <div className="absolute bottom-0 left-0 p-8 text-left">
          <p className="text-white/60 text-[10px] uppercase tracking-[0.3em] mb-2">{leftSubtitle}</p>
          <h3 className="font-serif text-white text-3xl font-bold mb-4 whitespace-pre-line">{leftTitle}</h3>
          <a
            href={leftButtonUrl}
            className="inline-block text-white text-[11px] uppercase tracking-widest border-b border-white/60 pb-0.5 hover:border-white transition-colors duration-300"
          >
            {leftButtonText}
          </a>
        </div>
      </div>
      <div className="relative h-[60vh] overflow-hidden group">
        <img
          src={rightImageUrl.url}
          alt={rightSubtitle}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-500" />
        <div className="absolute bottom-0 left-0 p-8 text-left">
          <p className="text-white/60 text-[10px] uppercase tracking-[0.3em] mb-2">{rightSubtitle}</p>
          <h3 className="font-serif text-white text-3xl font-bold mb-4 whitespace-pre-line">{rightTitle}</h3>
          <a
            href={rightButtonUrl}
            className="inline-block text-white text-[11px] uppercase tracking-widest border-b border-white/60 pb-0.5 hover:border-white transition-colors duration-300"
          >
            {rightButtonText}
          </a>
        </div>
      </div>
    </div>
  );
}
