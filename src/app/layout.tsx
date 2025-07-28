import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Federo } from "next/font/google";
import '@/src/app/globals.scss'
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const federo = Federo({
  weight: "400",
  variable: "--font-federo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aishou Anime",
  description: "Discover the best anime",
  icons: {
    icon: "/favicon.png"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${federo.variable}`} suppressHydrationWarning>
        {children}
        <ToastContainer 
          limit={5}
          closeOnClick={true}
          transition={Bounce}
          theme="colored"
          hideProgressBar={true}
        />
      </body>
    </html>
  );
}
