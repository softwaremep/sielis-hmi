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
      <header className="flex items-center border-b border-b-stone-200 bg-stone-50 px-6 py-3 pl-32">
        <div className="mr-6 text-xl font-semibold text-blue-900">SiElis</div>
        <div>
          <h1 className="text-xl font-semibold">
            Sistem Informasi Energi Listrik
          </h1>
          <div className="font-medium">Institut Teknologi Bandung</div>
        </div>
        <nav className="ml-20 flex gap-8 text-blue-900">{navList}</nav>
      </header>
      <main className="mx-auto mt-14 max-w-screen-lg">{children}</main>
      <footer className="mt-14 border-t border-t-stone-200 bg-stone-50 py-4 pl-32 text-sm">
        <p>Dikembangkan oleh</p>
        <p className="font-medium">Lab Manajemen Energi Teknik Fisika ITB</p>
      </footer>
    </>
  );
}

export default Layout;
