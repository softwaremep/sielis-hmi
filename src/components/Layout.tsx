import { Icon } from '@iconify/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Store nav data
const navListData = [
  { label: 'Beranda', href: '/', icon: 'bi:house-door-fill' },
  { label: 'Harian', href: '/daily', icon: 'bi:calendar-day-fill' },
  { label: 'Bulanan', href: '/monthly', icon: 'bi:calendar-month-fill' },
];

type Props = {
  title: string;
};

function Layout({ title, children }: React.PropsWithChildren<Props>) {
  const router = useRouter();
  // Render nav
  const navList = navListData.map(navItem => (
    <Link href={navItem.href} key={navItem.href}>
      <a
        className={`${
          router.pathname === navItem.href // style active route
            ? 'border-stone-200 bg-stone-100'
            : 'border-transparent'
        } flex items-center gap-3 rounded-sm border py-1.5 px-3 font-medium`}
      >
        <Icon icon={navItem.icon} className="h-5 w-5" />
        {navItem.label}
      </a>
    </Link>
  ));

  return (
    <>
      <Head>
        <title>{title} | SiElis - Lab Manajemen Energi Teknik Fisika ITB</title>
      </Head>
      <div className="flex min-h-screen flex-col gap-14">
        <header className="border-b border-b-stone-200 bg-stone-50">
          <div className="container mx-auto flex max-w-screen-lg items-center px-6 py-3">
            <div className="mr-6 text-xl font-semibold text-blue-900">
              SiElis
            </div>
            <div className="hidden md:block">
              <h1 className="font-semibold lg:text-xl">
                Sistem Informasi Energi Listrik
              </h1>
              <div className="text-sm font-medium lg:text-base">
                Institut Teknologi Bandung
              </div>
            </div>
            <nav className="ml-5 hidden gap-4 text-blue-900 sm:flex lg:ml-20 lg:gap-8">
              {navList}
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-6 lg:max-w-screen-lg">
          {children}
        </main>
        <footer className="mt-auto border-t border-t-stone-200 bg-stone-50">
          <p className="container mx-auto max-w-screen-lg py-3 px-6 text-sm">
            Dikembangkan oleh
            <span className="block font-medium">
              Lab Manajemen Energi Teknik Fisika ITB
            </span>
          </p>
        </footer>
      </div>
    </>
  );
}

export default Layout;
