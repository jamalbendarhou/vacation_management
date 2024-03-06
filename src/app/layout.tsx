import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "App gestion de conge ",
  description: "application de gestion de conge avec  ReactJs ey Nextjs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Create a client

  return (
    <html lang="en">
      <body className="relative bg-yellow-50 overflow-hidden max-h-screen">
    
              {children}
        
        </body>
    </html>
  );
}