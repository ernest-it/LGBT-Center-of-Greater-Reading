import { Outfit } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'LGBT Center of Greater Reading',
    template: '%s | LGBT Center of Greater Reading',
  },
  description:
    'The LGBT Center of Greater Reading provides a safe, inclusive space with services, programs, and resources for the LGBTQ+ community in Berks County.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
