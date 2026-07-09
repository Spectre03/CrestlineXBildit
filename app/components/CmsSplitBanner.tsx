import React from 'react';

export default function CmsSplitBanner({
  leftImageUrl = { url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80', src: '' },
  leftSubtitle = 'Women',
  leftTitle = 'New Season\nArrivals',
  leftButtonText = 'Shop Women',
  leftButtonUrl = '/collections/all',
  rightImageUrl = { url: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=900&q=80', src: '' },
  rightSubtitle = 'Men',
  rightTitle = 'Essential\nCollection',
  rightButtonText = 'Shop Men',
  rightButtonUrl = '/collections/all',
}: any) {
  const leftImg = leftImageUrl?.url || leftImageUrl?.src || '';
  const rightImg = rightImageUrl?.url || rightImageUrl?.src || '';

  return (
    <div className="grid md:grid-cols-2 gap-0 my-4 mx-4 md:mx-8">
      <div className="relative h-[60vh] overflow-hidden group">
        <img
          src={leftImg}
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
          src={rightImg}
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
