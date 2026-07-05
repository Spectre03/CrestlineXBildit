import {useParams, Form, Await, useRouteLoaderData} from '@remix-run/react';
import useWindowScroll from 'react-use/esm/useWindowScroll';
import {Disclosure} from '@headlessui/react';
import {Suspense, useEffect, useMemo} from 'react';
import {CartForm} from '@shopify/hydrogen';

import {type LayoutQuery} from 'storefrontapi.generated';
import {Text, Heading, Section} from '~/components/Text';
import {Link} from '~/components/Link';
import {Cart} from '~/components/Cart';
import {CartLoading} from '~/components/CartLoading';
import {Input} from '~/components/Input';
import {Drawer, useDrawer} from '~/components/Drawer';
import {CountrySelector} from '~/components/CountrySelector';
import {
  IconMenu,
  IconCaret,
  IconLogin,
  IconAccount,
  IconBag,
  IconSearch,
} from '~/components/Icon';
import {
  type EnhancedMenu,
  type ChildEnhancedMenuItem,
  useIsHomePath,
} from '~/lib/utils';
import {useIsHydrated} from '~/hooks/useIsHydrated';
import {useCartFetchers} from '~/hooks/useCartFetchers';
import type {RootLoader} from '~/root';

type LayoutProps = {
  children: React.ReactNode;
  layout?: LayoutQuery & {
    headerMenu?: EnhancedMenu | null;
    footerMenu?: EnhancedMenu | null;
  };
};

export function PageLayout({children, layout}: LayoutProps) {
  const {headerMenu, footerMenu} = layout || {};
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        {headerMenu && layout?.shop.name && (
          <Header title="Crestline Commerce" menu={headerMenu} />
        )}
        <main role="main" id="mainContent" className="flex-grow">
          {children}
        </main>
      </div>
      {footerMenu && <Footer menu={footerMenu} />}
    </>
  );
}

function Header({title, menu}: {title: string; menu?: EnhancedMenu}) {
  const isHome = useIsHomePath();

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  const addToCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesAdd);

  // toggle cart drawer when adding to cart
  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      {menu && (
        <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      )}
      <DesktopHeader
        isHome={isHome}
        title={title}
        menu={menu}
        openCart={openCart}
      />
      <MobileHeader
        isHome={isHome}
        title={title}
        openCart={openCart}
        openMenu={openMenu}
      />
    </>
  );
}

function CartDrawer({isOpen, onClose}: {isOpen: boolean; onClose: () => void}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Drawer open={isOpen} onClose={onClose} heading="Cart" openFrom="right">
      <div className="grid">
        <Suspense fallback={<CartLoading />}>
          <Await resolve={rootData?.cart}>
            {(cart) => <Cart layout="drawer" onClose={onClose} cart={cart} />}
          </Await>
        </Suspense>
      </div>
    </Drawer>
  );
}

export function MenuDrawer({
  isOpen,
  onClose,
  menu,
}: {
  isOpen: boolean;
  onClose: () => void;
  menu: EnhancedMenu;
}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
      <div className="grid">
        <MenuMobileNav menu={menu} onClose={onClose} />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({
  menu,
  onClose,
}: {
  menu: EnhancedMenu;
  onClose: () => void;
}) {
  return (
    <nav className="grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8">
      {/* Top level menu items */}
      {(menu?.items || []).map((item) => {
        const isNews = item.title.toLowerCase() === 'news';
        return (
          <span key={item.id} className="block">
            <Link
              to={isNews ? '/journal' : item.to}
              target={item.target}
              onClick={onClose}
              className={({isActive}) =>
                isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
              }
            >
              <Text as="span" size="copy">
                {isNews ? 'Journal' : item.title}
              </Text>
            </Link>
          </span>
        );
      })}
    </nav>
  );
}

function MobileHeader({
  title,
  isHome,
  openCart,
  openMenu,
}: {
  title: string;
  isHome: boolean;
  openCart: () => void;
  openMenu: () => void;
}) {
  // useHeaderStyleFix(containerStyle, setContainerStyle, isHome);

  const params = useParams();

  return (
    <header
      role="banner"
      className={`${
        isHome
          ? 'bg-primary/80 dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader'
          : 'bg-contrast/80 text-primary'
      } flex lg:hidden items-center h-nav sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 px-4 md:px-8`}
    >
      <div className="flex items-center justify-start w-full gap-4">
        <button
          onClick={openMenu}
          className="relative flex items-center justify-center w-8 h-8"
        >
          <IconMenu />
        </button>
        <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : '/search'}
          className="items-center gap-2 sm:flex"
        >
          <button
            type="submit"
            className="relative flex items-center justify-center w-8 h-8"
          >
            <IconSearch />
          </button>
          <Input
            className={
              isHome
                ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
        </Form>
      </div>

      <Link
        className="flex items-center self-stretch leading-[3rem] md:leading-[4rem] justify-center flex-grow w-full h-full"
        to="/"
      >
        <Heading
          className="font-serif font-bold text-center leading-none tracking-widest uppercase text-lg"
          as={isHome ? 'h1' : 'h2'}
        >
          {title}
        </Heading>
      </Link>

      <div className="flex items-center justify-end w-full gap-4">
        <AccountLink className="relative flex items-center justify-center w-8 h-8" />
        <CartCount isHome={isHome} openCart={openCart} />
      </div>
    </header>
  );
}

function DesktopHeader({
  isHome,
  menu,
  openCart,
  title,
}: {
  isHome: boolean;
  openCart: () => void;
  menu?: EnhancedMenu;
  title: string;
}) {
  const params = useParams();
  const {y} = useWindowScroll();
  return (
    <header
      role="banner"
      className={`${
        isHome
          ? 'bg-primary/95 text-contrast shadow-darkHeader'
          : 'bg-contrast/95 text-primary border-b border-primary/10'
      } ${
        !isHome && y > 50 && 'shadow-lightHeader'
      } hidden h-nav lg:flex items-center sticky transition-all duration-500 backdrop-blur-xl z-40 top-0 justify-between w-full leading-none gap-8 px-12 py-6`}
    >
      <div className="flex gap-16 items-center">
        <Link className="font-serif font-bold tracking-widest text-xl uppercase" to="/" prefetch="intent">
          {title}
        </Link>
        <nav className="flex gap-10">
          {(menu?.items || []).map((item) => {
            const isNews = item.title.toLowerCase() === 'news';
            return (
              <Link
                key={item.id}
                to={isNews ? '/journal' : item.to}
                target={item.target}
                prefetch="intent"
                className={({isActive}) =>
                  `text-sm uppercase tracking-widest font-medium transition-opacity duration-200 ${isActive ? 'opacity-100 border-b border-current pb-0.5' : 'opacity-70 hover:opacity-100'}`
                }
              >
                {isNews ? 'Journal' : item.title}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex items-center gap-1">
        <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : '/search'}
          className="flex items-center gap-2"
        >
          <Input
            className={
              isHome
                ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
          <button
            type="submit"
            className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
          >
            <IconSearch />
          </button>
        </Form>
        <AccountLink className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5" />
        <CartCount isHome={isHome} openCart={openCart} />
      </div>
    </header>
  );
}

function AccountLink({className}: {className?: string}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  const isLoggedIn = rootData?.isLoggedIn;

  return (
    <Link to="/account" className={className}>
      <Suspense fallback={<IconLogin />}>
        <Await resolve={isLoggedIn} errorElement={<IconLogin />}>
          {(isLoggedIn) => (isLoggedIn ? <IconAccount /> : <IconLogin />)}
        </Await>
      </Suspense>
    </Link>
  );
}

function CartCount({
  isHome,
  openCart,
}: {
  isHome: boolean;
  openCart: () => void;
}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Suspense fallback={<Badge count={0} dark={isHome} openCart={openCart} />}>
      <Await resolve={rootData?.cart}>
        {(cart) => (
          <Badge
            dark={isHome}
            openCart={openCart}
            count={cart?.totalQuantity || 0}
          />
        )}
      </Await>
    </Suspense>
  );
}

function Badge({
  openCart,
  dark,
  count,
}: {
  count: number;
  dark: boolean;
  openCart: () => void;
}) {
  const isHydrated = useIsHydrated();

  const BadgeCounter = useMemo(
    () => (
      <>
        <IconBag />
        <div
          className={`${
            dark
              ? 'text-primary bg-contrast dark:text-contrast dark:bg-primary'
              : 'text-contrast bg-primary'
          } absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
        >
          <span>{count || 0}</span>
        </div>
      </>
    ),
    [count, dark],
  );

  return isHydrated ? (
    <button
      onClick={openCart}
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </button>
  ) : (
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </Link>
  );
}

function Footer({menu}: {menu?: EnhancedMenu}) {
  return (
    <footer className="bg-primary text-contrast">
      {/* Top footer grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 md:px-12 lg:px-16 py-16 border-b border-contrast/10">
        {/* Brand column */}
        <div className="md:col-span-1">
          <Link to="/" className="font-serif text-xl font-bold tracking-widest uppercase block mb-4">
            Crestline Commerce
          </Link>
          <p className="text-contrast/40 text-xs leading-relaxed mb-6 font-light">
            Premium collections crafted for those who refuse to settle. Quality you can feel.
          </p>
          <div className="flex gap-4">
            {['Instagram', 'Twitter', 'Pinterest'].map((s) => (
              <a key={s} href="#" className="text-contrast/30 text-[10px] uppercase tracking-widest hover:text-contrast/80 transition-colors duration-300">{s}</a>
            ))}
          </div>
        </div>

        {/* Shop column */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-contrast/40 mb-6 font-medium">Shop</h4>
          <ul className="space-y-3">
            {[
              {label: 'All Products', to: '/products'},
              {label: 'Collections', to: '/collections'},
              {label: 'New Arrivals', to: '/collections/all'},
              {label: 'Sale', to: '/collections/all'},
              {label: 'Gift Cards', to: '/products'},
            ].map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-contrast/50 text-xs tracking-wide hover:text-contrast transition-colors duration-300 font-light">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help column */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-contrast/40 mb-6 font-medium">Help</h4>
          <ul className="space-y-3">
            {[
              {label: 'Privacy Policy', to: '/policies/privacy-policy'},
              {label: 'Terms of Service', to: '/policies/terms-of-service'},
              {label: 'Shipping Policy', to: '/policies/shipping-policy'},
              {label: 'Refund Policy', to: '/policies/refund-policy'},
              {label: 'Contact Us', to: '/'},
            ].map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-contrast/50 text-xs tracking-wide hover:text-contrast transition-colors duration-300 font-light">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter column */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-contrast/40 mb-6 font-medium">Stay Updated</h4>
          <p className="text-contrast/40 text-xs leading-relaxed mb-4 font-light">Subscribe for exclusive drops and member offers.</p>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="bg-contrast/5 border border-contrast/10 px-4 py-3 text-xs text-contrast placeholder:text-contrast/25 focus:outline-none focus:border-contrast/40 transition-colors duration-300 tracking-wide"
            />
            <button className="bg-contrast text-primary px-4 py-3 text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-contrast/90 transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-12 lg:px-16 py-6 gap-4">
        <p className="text-contrast/25 text-[10px] tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Crestline Commerce. All Rights Reserved.
        </p>
        <div className="flex gap-6">
          {[
            {label: 'Privacy Policy', to: '/policies/privacy-policy'},
            {label: 'Terms of Service', to: '/policies/terms-of-service'},
            {label: 'Refund Policy', to: '/policies/refund-policy'},
          ].map((item) => (
            <Link key={item.label} to={item.to} className="text-contrast/25 text-[10px] uppercase tracking-widest hover:text-contrast/60 transition-colors duration-300">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

function FooterLink({item}: {item: ChildEnhancedMenuItem}) {
  if (item.to.startsWith('http')) {
    return (
      <a href={item.to} target={item.target} rel="noopener noreferrer">
        {item.title}
      </a>
    );
  }

  return (
    <Link to={item.to} target={item.target} prefetch="intent">
      {item.title}
    </Link>
  );
}

function FooterMenu({menu}: {menu?: EnhancedMenu}) {
  const styles = {
    section: 'grid gap-4',
    nav: 'grid gap-2 pb-6',
  };

  return (
    <>
      {(menu?.items || []).map((item) => (
        <section key={item.id} className={styles.section}>
          <Disclosure>
            {({open}) => (
              <>
                <Disclosure.Button className="text-left md:cursor-default">
                  <Heading className="flex justify-between" size="lead" as="h3">
                    {item.title}
                    {item?.items?.length > 0 && (
                      <span className="md:hidden">
                        <IconCaret direction={open ? 'up' : 'down'} />
                      </span>
                    )}
                  </Heading>
                </Disclosure.Button>
                {item?.items?.length > 0 ? (
                  <div
                    className={`${
                      open ? `max-h-48 h-fit` : `max-h-0 md:max-h-fit`
                    } overflow-hidden transition-all duration-300`}
                  >
                    <Suspense data-comment="This suspense fixes a hydration bug in Disclosure.Panel with static prop">
                      <Disclosure.Panel static>
                        <nav className={styles.nav}>
                          {item.items.map((subItem: ChildEnhancedMenuItem) => (
                            <FooterLink key={subItem.id} item={subItem} />
                          ))}
                        </nav>
                      </Disclosure.Panel>
                    </Suspense>
                  </div>
                ) : null}
              </>
            )}
          </Disclosure>
        </section>
      ))}
    </>
  );
}
