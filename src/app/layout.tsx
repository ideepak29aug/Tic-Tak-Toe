import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Tic Tak Toe",
  description: "This is the IMPOSSIBLE Tic Tak Toe game, where user can never ever WINS",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
