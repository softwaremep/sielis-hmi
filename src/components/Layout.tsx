import Link from 'next/link';

function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <header>
        <div>SiElis</div>
        <div>
          <h1>Sistem Informasi Energi Listrik</h1>
          <div>Institut Teknologi Bandung</div>
        </div>
        <nav>
          <Link href="/">
            <a>Beranda</a>
          </Link>
          <Link href="/daily">
            <a>Harian</a>
          </Link>
          <Link href="/monthly">
            <a>Bulanan</a>
          </Link>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}

export default Layout;
