import type { Metadata } from 'next';
import './globals.css';

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'S10 Digital Solutions';
const siteTagline = process.env.NEXT_PUBLIC_SITE_TAGLINE || 'AI-powered design, marketing, resumes, productivity, and web apps.';

export const metadata: Metadata = {
  title: {
    default: `${siteName} — ${siteTagline}`,
    template: `%s — ${siteName}`,
  },
  description: siteTagline,
  applicationName: siteName,
  metadataBase: new URL('https://agentic-7566eb55.vercel.app'),
  openGraph: {
    type: 'website',
    title: siteName,
    description: siteTagline,
    url: 'https://agentic-7566eb55.vercel.app',
    siteName,
    locale: 'en_US',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: `${siteName} — ${siteTagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteTagline,
    images: ['/og.png'],
  },
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
