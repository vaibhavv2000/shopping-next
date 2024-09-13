"use client";

import styled from "styled-components";
import {useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/lib/redux";
import {toggleSidebar} from "@/redux/userSlice";
import {BsGrid3X3GapFill} from "react-icons/bs";

const Navbar = () => {
 const {isDarkMode} = useAppSelector(state => state.user);
 const {push} = useRouter();
 const dispatch = useAppDispatch();

 return (
  <Nav isDarkMode={isDarkMode}>
   <Left>
 	<BsGrid3X3GapFill
	 size={24}
	 color={!isDarkMode ? "#666" : "#fff"}
	 style={{cursor: "pointer"}}
	 onClick={() => dispatch(toggleSidebar())}
	/>
	<Logo isDarkMode={isDarkMode} onClick={() => push("/home")}>ShopCart</Logo>
   </Left>
  </Nav>
 );
};

export default Navbar;

const Nav = styled.nav<{isDarkMode: boolean}>`
 background-color: ${({isDarkMode}) => (isDarkMode ? "#111" : "#fff")};
 height: 56px;
 display: flex;
 padding: 0 12px;
 align-items: center;
 justify-content: space-between;
 box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const Logo = styled.h1<{isDarkMode: boolean}>`
 color: ${({isDarkMode}) => !isDarkMode ? "#111" : "#f5f5f5"};
 font-weight: 500;
 font-size: 22px;
 cursor: pointer;
`;

const Left = styled.div`
 display: flex;
 gap: 10px;
 width: 100%;
 max-width: 1140px;
 margin: auto;
`;