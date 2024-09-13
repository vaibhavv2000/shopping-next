import {Metadata} from "next";
import {ReactNode} from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export const metadata: Metadata = {
 title: "Home",
 description: "products page",
};

const Layout = ({children}: {children: ReactNode}) => {
 return (
  <main style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
   <Navbar />
   <Sidebar />
   {children}
  </main>
 );
};

export default Layout;