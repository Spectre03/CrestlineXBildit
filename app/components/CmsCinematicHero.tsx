import React from 'react';

export default function CmsCinematicHero() {
  /**
   * @group Content
   * @type String
   */
  const subtitle = 'Crestline Commerce · Est. 2024';

  /**
   * @group Content
   * @type String
   */
  const title = 'Define Your Standard.';

  /**
   * @group Content
   * @type String
   */
  const description = 'Premium collections for those who refuse to settle. Crafted for the exceptional.';

  /**
   * @group Content
   * @type Image
   */
  const imageUrl = {
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=90',
  };

  /**
   * @group Buttons
   * @type String
   */
  const primaryButtonText = 'Shop Collection';

  /**
   * @group Buttons
   * @type String
   */
  const primaryButtonUrl = '/collections/all';

  /**
   * @group Buttons
   * @type String
   */
  const secondaryButtonText = 'Explore All';

  /**
   * @group Buttons
   * @type String
   */
  const secondaryButtonUrl = '/products';

  /**
   * @group Bottom Scroll
   * @type RichText
   */
  const scrollText = {
    text: 'Scroll',
  };

  return (
    <div className="relative -mt-nav h-screen flex items-end overflow-hidden bg-black w-full">
      <img
        src={imageUrl.src}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover object-center animate-scale-in"
        style={{animation: 'scaleIn 8s ease-out forwards'}}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />
      <div className="absolute left-8 top-1/2 -translate-y-1/2 w-px h-32 bg-white/20 hidden lg:block" />
      <div className="relative z-10 px-8 pb-24 sm:px-12 md:px-20 w-full max-w-5xl text-left">
        <p className="text-white/50 text-[10px] uppercase tracking-[0.4em] mb-6 font-medium">
          {subtitle}
        </p>
        <h1 className="font-serif text-white text-6xl sm:text-7xl md:text-8xl font-bold leading-[0.95] mb-8 max-w-3xl whitespace-pre-line">
          {title}
        </h1>
        <p className="text-white/60 text-base font-light tracking-widest max-w-sm mb-10 leading-relaxed">
          {description}
        </p>
        <div className="flex gap-4 flex-wrap">
          {primaryButtonText && (
            <a
              href={primaryButtonUrl}
              className="inline-block px-12 py-4 bg-white text-black text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-white/90 transition-all duration-500"
            >
              {primaryButtonText}
            </a>
          )}
          {secondaryButtonText && (
            <a
              href={secondaryButtonUrl}
              className="inline-block px-12 py-4 border border-white/40 text-white text-[11px] uppercase tracking-[0.25em] font-medium hover:border-white hover:bg-white/10 transition-all duration-500"
            >
              {secondaryButtonText}
            </a>
          )}
        </div>
      </div>
      <div className="absolute bottom-8 right-12 flex flex-col items-center gap-2 opacity-50">
        <span className="text-white text-[9px] uppercase tracking-[0.3em] rotate-90 mb-4">
          {scrollText.text}
        </span>
        <div className="w-px h-12 bg-white/40" />
      </div>
    </div>
  );
}
