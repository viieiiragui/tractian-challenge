import type { Metadata } from 'next';

import { Header } from '@/components/Header';
import { GlobalContextProvider } from '@/contexts/GlobalContext';
import { inter, roboto } from '@/styles/fonts';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Tractian Challenge',
  description: 'Developed by Guilherme Vieira',
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
  readonly navigation: React.ReactNode;
  readonly component: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto.variable}`}>
      <body className="flex h-screen w-full flex-col bg-body-background">
        <GlobalContextProvider>
          <Header />

          <main className="m-2 flex h-layout flex-col rounded bg-white p-4">
            {props.children}

            <div className="mt-3 grid flex-1 grid-cols-layout gap-2 overflow-clip">
              {props.navigation}

              {props.component}
            </div>
          </main>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
