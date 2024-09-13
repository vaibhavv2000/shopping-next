"use client";

import styled from "styled-components";
import {IoMdStar} from "react-icons/io";
import {ImPriceTag} from "react-icons/im";
import {useAppSelector} from "@/lib/redux";
import NotAuth from "@/components/NotAuth";
import {Description, Details, IconHolder, Image, Info, Price, PriceHolder, Product, Rating, RatingHolder, Title, Type, TypeHolder} from "../products/Products";
import {PiShoppingCartSimpleFill} from "react-icons/pi";

const History = () => {
 const {user, isDarkMode} = useAppSelector(state => state.user);
 const {orderHistory} = useAppSelector(state => state.product);

 if (!user) return <NotAuth />;

 if (orderHistory.length < 1) return <NotAuth title='No Order History' />;

 return (
  <Main isDarkMode={isDarkMode}>
   <ProductBox>
	<Header>
	 <HeadTitle cl={isDarkMode ? "#fff" : "#111"}>My Order History</HeadTitle>
	</Header>
	<Products>
	{orderHistory.map((item,index) => (
	<Product key={`history-${index}`} bg={isDarkMode ? "#111" : "#fff"}>
	 <Image src={item.image} alt={item.title} />
	 <Info>
	  <Title cl={isDarkMode ? "#fff" : "#111"}>
	   {item.title}
	  </Title>
	  <Details>
	   <Description cl={isDarkMode ? "#f5f5f5" : "#444"}>
		{item.description.slice(0, 60)}...
	   </Description>
        <QuantityHolder>
		 <IconHolder>
		  <PiShoppingCartSimpleFill size={20} color={isDarkMode ? "#fff" : "#585858"} />	
		 </IconHolder>
		 <Quantity cl={isDarkMode ? "#fff" : "#555"}>
		  {item.quantity}
		 </Quantity>
		</QuantityHolder>
	   <PriceHolder>
		<IconHolder>	
		 <ImPriceTag size={16} color={isDarkMode ? "#fff" : "#585858"} />
		</IconHolder> 
		<Price cl={isDarkMode ? "#fff" : "#555"}>{item.price}</Price>
	   </PriceHolder>
	   <RatingHolder>
		<IconHolder>
		<IoMdStar size={22} color={isDarkMode ? "#e8e8e8" : "#4b4b4b"} />				
		</IconHolder>
		<Rating cl={isDarkMode ? "#e8e8e8" : "#222"}>
		 {item.rating}
		</Rating>
	   </RatingHolder>
	  </Details>
	  <div style={{flex: 1, display: "flex", alignItems: "flex-end"}}>
	   <TypeHolder cl={isDarkMode}>
		<Type>{item.type}</Type>
	   </TypeHolder>
	  </div>
	 </Info>
	</Product>
	))}
	</Products>
   </ProductBox>
  </Main>
 );
};

export default History;

const Main = styled.div<{isDarkMode: boolean}>`
  display: flex;
  margin-top: ${({isDarkMode}) => (isDarkMode ? 0 : "20px")};
  padding-top: ${({isDarkMode}) => (!isDarkMode ? 0 : "20px")};
  min-height: calc(100vh - 60px);
  justify-content: center;
  background-color: ${({isDarkMode}) => (isDarkMode ? "#181818" : "#fff")};
`;

const ProductBox = styled.div`
 max-width: 1140px;
 height: 50px;
 width: 100%;
 height: max-content;
`;

const Header = styled.div`
 display: flex;
 position: relative;
 justify-content: space-between;
 align-items: center;
 padding: 7px 10px;
`;

const HeadTitle = styled.h2<{cl: string}>`
 font-size: 22px;
 font-weight: 500;
 color: ${({cl}) => cl};
`;
 
const Products = styled.div`
 display: grid;
 padding: 10px;
 gap: 10px;
 grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;
 
const QuantityHolder = styled.div`
 display: flex; 
 align-items: center; 
 gap: 10px;
`;

const Quantity =  styled.span<{cl: string}>`
 color: ${({cl}) => cl};
 font-weight: 500;
 font-size: 12px;
`;