"use client";

import {MdAccountCircle, MdNightlight, MdSunny} from "react-icons/md";
import styled from "styled-components";
import {BiStoreAlt,BiBell} from "react-icons/bi";
import {RiAccountCircleLine} from "react-icons/ri";
import {ImHistory} from "react-icons/im";
import {
 AiOutlineHeart,
 AiOutlineShoppingCart,
 AiOutlineLogin,
 AiOutlineHome,
} from "react-icons/ai";
import {IoArrowBackOutline} from "react-icons/io5";
import {useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/lib/redux";
import AuthBox from "@/components/AuthBox";
import {logout, toggleAuthModal, toggleDarkMode, toggleSidebar} from "@/redux/userSlice";
import {useEffect, useState} from "react";
import {API} from "@/lib/API";

let size = 25;

const Sidebar = () => {
 const {showSidebar, user, showAuthModal, isDarkMode} = useAppSelector(state => state.user);
 const {push} = useRouter();
 const dispatch = useAppDispatch();

 const handleLogout = async () => {
  await API.delete("/auth/logout");
  localStorage.removeItem("shopping-user");
  dispatch(logout());
  location.reload();
 };

 useEffect(() => {
  if(isDarkMode) localStorage.setItem("shopping-darkmode", "true");
  else localStorage.removeItem("shopping-darkmode");
 }, [isDarkMode]);

 return (
  <NavContainer 
   style={{transform: `scale(${showSidebar ? 1 : 0})`}} 
   onClick={() => dispatch(toggleSidebar())}
  >
   <Nav 
	style={{width: showSidebar ? "280px" : "0px"}} 
	dm={isDarkMode} 
	onClick={e => e.stopPropagation()}
   >
   {showAuthModal && <AuthBox />}		
   <UserInfo dm={isDarkMode}>
	<div className='profile-holder'>		
	 <MdAccountCircle size={50} color={"#fff"} />
	 <IoArrowBackOutline
	  size={23}
	  color='#fff'
	  style={{cursor: "pointer"}}
	  onClick={() => dispatch(toggleSidebar())}
	 />
	</div>
	<UserTitle>Hello, {user?.name || "Guest"}</UserTitle>
   </UserInfo>
   <NavList>
	<ListItem dm={isDarkMode} onClick={() => push("/home")}>
	 <AiOutlineHome size={size} color={!isDarkMode ? "#111" : "#fff"} />
	 <span>Home</span>
	</ListItem>
	<ListItem dm={isDarkMode} onClick={() => push("/home/wishlist")}>
	 <AiOutlineHeart size={size} color={isDarkMode ? "#fff" : "#111"} />
	 <span>Wishlist</span>
	</ListItem>
	<ListItem dm={isDarkMode} onClick={() => push("/home/orders")}>
	 <AiOutlineShoppingCart size={26} color={isDarkMode ? "#fff" : "#111"} />
	 <span>My Orders</span>
	</ListItem>
	<ListItem dm={isDarkMode} onClick={() => push("/home/history")}>
	 <ImHistory size={size} color={isDarkMode ? "#fff" : "#111"} />
	 <span>Order History</span>
	</ListItem>
	<ListItem dm={isDarkMode}>
	 <RiAccountCircleLine size={size} color={isDarkMode ? "#fff" : "#111"} />
	 <span>My Account</span>
	</ListItem>
	<ListItem dm={isDarkMode}>
	 <BiStoreAlt size={size} color={isDarkMode ? "#fff" : "#111"} />
	 <span>Trending Stores</span>
	 <span className='new'>NEW</span>
	</ListItem>
	<ListItem dm={isDarkMode}>
	 <BiBell size={size} color={isDarkMode ? "#fff" : "#111"} />
	 <span>Notifications</span>
	</ListItem>
	<ListItem dm={isDarkMode} onClick={() => dispatch(toggleDarkMode(!isDarkMode))}>
	  {!isDarkMode ? (<MdSunny size={24} color={"gold"} />) : (<MdNightlight size={24} color={"gold"} />)}
	 <span>{!isDarkMode ? "Light" : "Dark"} Mode</span>
	</ListItem>
	{user?.email ? (
	<ListItem dm={isDarkMode} onClick={handleLogout}>
	 <AiOutlineLogin size={size} color={isDarkMode ? "#fff" : "#111"} />
	 <span>Logout</span>
	</ListItem>
	) : (
	<ListItem dm={isDarkMode} onClick={() => dispatch(toggleAuthModal())}>
	 <AiOutlineLogin size={size} color={isDarkMode ? "#fff" : "#111"} />
	 <span>Login</span>
	</ListItem>
	)}
   </NavList>
  </Nav>
  </NavContainer>
 );
};

export default Sidebar;

const NavContainer = styled.aside`
 background-color: rgba(0,0,0,0.5);
 position: fixed;
 top: 0;
 height: 100vh;
 width: 100vw;
 z-index: 9999999999;
`;

const Nav = styled.nav<{dm: boolean}>`
 height: 100%;
 background-color: ${({dm}) => (dm ? "#151515" : "#fff")};
 transition: all 0.5s ease-in;
`;

const NavList = styled.section`
 display: flex;
 flex-direction: column;
`;

const UserInfo = styled.div<{dm: boolean}>`
 display: flex;
 padding: 20px 10px 10px 10px;
 background-color: ${({dm}) => (dm ? "#111" : "dodgerblue")};
 gap: 17px;
 flex-direction: column;

 .profile-holder {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
 }
`;

const UserTitle = styled.p`
 font-weight: 400;
 color: #fff;
 font-size: 20px;
`;

const ListItem = styled.div<{dm: boolean}>`
 display: flex;
 align-items: center;
 padding: 10px;
 gap: 13px;
 margin: 3px 0;
 transition: all 0.4s ease-in-out;
 cursor: pointer;

 &:hover {
  background-color: ${({dm}) => !dm ? "rgba(0, 0, 0, 0.041)" : "rgba(255, 255, 255, 0.081)"};
 }

 span {
  font-weight: 400;
  font-size: 15px;
  color: ${({dm}) => (dm ? "#fff" : "#111")};
 }

 .new {
  background-color: red;
  padding: 2px 4px;
  font-size: 12px;
  color: #fff;
 }
`;