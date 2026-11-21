import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'FixMate | Smart Device & Home Appliance Repair Service Platform',
  description:
    'On-demand device and home appliance repair booking platform. Verified technicians, transparent status tracking, and 100% pay-after-service guarantee.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#1b2932] text-[#fefdfe]">
        <AuthProvider>
          <Navbar />
          <div className="flex-1 w-full">{children}</div>
          <Footer />
          <Toaster
            position="top-right"
            richColors
            theme="dark"
            toastOptions={{
              style: {
                borderRadius: '0px',
                border: '1px solid #32414a',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '12px',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
