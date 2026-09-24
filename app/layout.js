import './globals.css';

export const metadata = {
  title: 'Om Kumar — Computer Science · Cybersecurity · Creative Design',
  description: 'Portfolio of Om Kumar — Computer Science graduate with expertise in cybersecurity and creative problem-solving. Building secure digital experiences with creative precision.',
  keywords: ['Om Kumar', 'Portfolio', 'Cybersecurity', 'Web Developer', 'Creative Design', 'Computer Science', 'Jamshedpur'],
  authors: [{ name: 'Om Kumar' }],
  creator: 'Om Kumar',
  openGraph: {
    title: 'Om Kumar — Portfolio',
    description: 'Computer Science graduate with expertise in cybersecurity and creative design.',
    url: 'https://omkumar.vercel.app',
    siteName: 'Om Kumar Portfolio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Om Kumar — Portfolio',
    description: 'Computer Science graduate with expertise in cybersecurity and creative design.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script src="/suppress-extension-errors.js" defer />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
