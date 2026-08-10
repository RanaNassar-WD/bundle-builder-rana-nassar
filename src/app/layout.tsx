import type { Metadata } from "next";
import "../styles/globals.css";
import "antd/dist/reset.css";


export const metadata: Metadata = {
  title: "Bundle Builder By Rana ",
  description: "Landing page with bundle builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
