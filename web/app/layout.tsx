import { GlobalContextProvider } from "@/context/GlobalContextProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  );
}
