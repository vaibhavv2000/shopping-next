import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import StyledComponentsRegistry from "@/lib/StyledProvider";
import Provider from "@/lib/Provider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
 title: "Shopkart",
 description: "Shopping app",
};

interface props {
 children: ReactNode
};

function RootLayout({children,}: Readonly<props>) {
 return (
  <html lang="en">
   <body className={inter.className}>
    <StyledComponentsRegistry>
     <Provider>
      {children}
     </Provider>
    </StyledComponentsRegistry>
   </body>
  </html>
 );
};

export default RootLayout;