import '@fontsource/inter/variable.css';
import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MeterProvider } from '../lib/context';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MeterProvider>
        <Component {...pageProps} />
      </MeterProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
