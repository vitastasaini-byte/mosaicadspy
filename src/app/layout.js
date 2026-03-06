import './globals.css';

export const metadata = {
  title: 'Mosaic Intelligence Engine',
  description: 'Real-time Competitor Growth Intelligence for BeBodywise, Man Matters, and Little Joys.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
