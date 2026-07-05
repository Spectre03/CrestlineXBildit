// CmsMarqueeTicker:v1.0 legacy=false
// @template v2

import React from 'react';

/**
 * @group Items
 * @type String
 */
const item1 = 'Free Shipping Over $150';

/**
 * @group Items
 * @type String
 */
const item2 = 'New Arrivals Weekly';

/**
 * @group Items
 * @type String
 */
const item3 = 'Premium Quality Guaranteed';

/**
 * @group Items
 * @type String
 */
const item4 = 'Members Get 20% Off';

/**
 * @group Items
 * @type String
 */
const item5 = 'Sustainable Materials';

/**
 * @group Items
 * @type String
 */
const item6 = 'Free Returns · 30 Days';

/**
 * @group Items
 * @type String
 */
const item7 = 'Exclusive Member Access';

export default function CmsMarqueeTicker() {
  const items = [item1, item2, item3, item4, item5, item6, item7];

  return (
    <div className="bg-primary text-contrast py-4 overflow-hidden border-y border-white/5 w-full">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(2)].map((_, i) => (
          <span key={i} className="flex items-center">
            {items.map((text, j) => (
              <span key={j} className="inline-flex items-center gap-6 mx-8">
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium">{text}</span>
                <span className="text-white/20 text-lg">✦</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
