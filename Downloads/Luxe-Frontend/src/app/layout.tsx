import type { Metadata } from "next";
import "./globals.css";
import "./styles.css"; 


export const metadata: Metadata = {
  title: "LuxeRealty",
  description: "Boama's Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body

      >
        {children}
      </body>
    </html>
  );
}
