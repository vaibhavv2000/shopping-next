"use client";

import {useAppSelector} from "@/lib/redux";
import {AiFillShopping} from "react-icons/ai";
import styled from "styled-components";

interface props {
 title?: string;
};

const NotAuth = ({title}: props) => {
 const {isDarkMode} = useAppSelector(state => state.user);

 return (
  <Main bg={isDarkMode ? "#181818" : "#fff"}>
   <div style={{ display: "flex", justifyContent: "center" }}>
    <AiFillShopping size={70} color={isDarkMode ? "#fff" : "#111"} />
   </div>
   <Title cl={isDarkMode ? "#fff" : "#111"}>
    {title || "Not Logged In"}
   </Title>
  </Main>
 );
};

export default NotAuth;

const Main = styled.div<{ bg: string }>`
  display: grid;
  place-content: center;
  height: calc(100vh - 60px);
  background-color: ${({ bg }) => bg};
`;

const Title = styled.h1<{ cl: string }>`
  color: ${({ cl }) => cl};
  text-align: center;
  margin: 8px 0;
`;
