import { Icon } from '@iconify/react';
import Link from 'next/link';

function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <header className="flex items-center border-b border-b-stone-200 bg-stone-50 px-6 py-3 pl-32">
        <div className="mr-6 text-xl font-semibold text-blue-900">SiElis</div>
        <div>
          <h1 className="text-xl font-semibold">
            Sistem Informasi Energi Listrik
          </h1>
          <div className="font-medium">Institut Teknologi Bandung</div>
        </div>
        <nav className="ml-20 flex gap-8 text-blue-900">
          <Link href="/">
            <a className="flex items-center gap-3 font-medium">
              <Icon icon="bi:house-door-fill" className="h-6 w-6" />
              Beranda
            </a>
          </Link>
          <Link href="/daily">
            <a className="flex items-center gap-3 font-medium">
              <Icon icon="bi:calendar-day-fill" className="h-6 w-6" />
              Harian
            </a>
          </Link>
          <Link href="/monthly">
            <a className="flex items-center gap-3 font-medium">
              <Icon icon="bi:calendar-month-fill" className="h-6 w-6" />
              Bulanan
            </a>
          </Link>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}

export default Layout;
