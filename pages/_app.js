/* eslint-disable react/prop-types */
import '@/styles/globals.css';
import ClientProvider from '@/utils/context/ClientProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <ClientProvider>
      <Component {...pageProps} />
    </ClientProvider>
  );
}
