import '@/styles/globals.css';
import '@/components/v1/v1.css';
import { Inter, Figtree, Montserrat } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'HB-TRACE | Honey batch records',
  description: 'Public batch verification and staff operations workspace for Humble Beeing Honey.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${figtree.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
