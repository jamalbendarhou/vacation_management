import type { Metadata } from "next";
import  {Sidebar}  from "@components/layout/Sidebar";
import  {Navbar}  from "@components/layout/Navbar";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import NextTopLoader from 'nextjs-toploader';
import ReactQueryProvider from "@utils/ReactQueryProvider";

import "../globals.css";

export const metadata: Metadata = {
  title: "Vacation Manager App",
  description: "Vacation Manager App - A simple vacation manager app built with ReactJs and Nextjs.",
};
import theme from '../../../theme/themeConfig';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Create a client

  return (
    <html lang="en">
      <ConfigProvider theme={theme}>
      <body className="relative bg-yellow-50 overflow-hidden max-h-screen">
      <NextTopLoader
        color="#713f12"
        shadow="0 0 10px #713f12,0 0 5px #713f12"
      />
      <AntdRegistry>
          <ReactQueryProvider >
              {/* Navbar */}
              <Navbar />
              {/* Navbar */}

              {/* Sidebar */}
              <Sidebar />
              {/* Sidebar */}
              {/* children */}
              {children}
              {/* children */}
        </ReactQueryProvider>
      </AntdRegistry>
        
        </body>
  </ConfigProvider>
    </html>
  );
}
