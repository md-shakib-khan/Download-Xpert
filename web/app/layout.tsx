import { GlobalContextProvider } from "@/context/GlobalContextProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("1")
  return (
    <html lang="en">
      <body className="">
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  );
}
