import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PM Dashboard — Traverse South',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0b0b0b' }}>
      {children}
    </div>
  );
}
