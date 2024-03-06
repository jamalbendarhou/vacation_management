import type { Metadata } from "next";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import ReactQueryProvider from "@utils/ReactQueryProvider";

import "../globals.css";

export const metadata: Metadata = {
  title: "App gestion de conge",
  description: "application de gestion de conge avec react.js et next.js",
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
          <body className="relative bg-white overflow-hidden max-h-screen">
          <AntdRegistry>
              <ReactQueryProvider >
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