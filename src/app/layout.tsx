import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Fixura | Smart Device & Home Appliance Restoration Platform',
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
      <body className="min-h-screen flex flex-col bg-[#dde6f0] text-[#000000] antialiased selection:bg-[#1e3a8a] selection:text-white">
        <AuthProvider>
          <Navbar />
          <div className="flex-1 w-full">{children}</div>
          <Footer />
          <Toaster
            position="top-right"
            richColors
            theme="light"
            toastOptions={{
              style: {
                borderRadius: '8px',
                border: '1px solid #bfc7d1',
                fontFamily: 'Host Grotesk, sans-serif',
                fontSize: '13px',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
