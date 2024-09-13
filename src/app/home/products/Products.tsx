"use client";

import {useState, useEffect} from "react";
import Filter from "./Filter";
import {IoIosFunnel, IoMdStar} from "react-icons/io";
import styled from "styled-components";
import {ImPriceTag} from "react-icons/im";
import Link from "next/link";
import {useAppSelector} from "@/lib/redux";
import type {product} from "@/utils/types";

const ProductsPage = ({type}:{type:string}) => {
 const [products, setProducts] = useState<product[]>([]);
 const [title, setTitle] = useState("");
 const [list, setList] = useState<product[]>([]);

 const [rating, setRating] = useState(0);
 const [order, setOrder] = useState("");
 const [showFilter, setShowFilter] = useState(false);

 const allProducts = useAppSelector(state => state.product.products);
 const {isDarkMode} = useAppSelector(state => state.user);

 useEffect(() => {
  const filter = [...allProducts].filter((p) => p.type === type);

  setProducts(filter);
  setList(filter);
 }, [allProducts, type]);

 useEffect(() => {
  if (type === "watch") setTitle("Watches For you");
  if (type === "clothes") setTitle("Clothes");
  if (type === "mobile") setTitle("Mobiles For you");
 }, [type]);

 useEffect(() => {
  if (order === "Ascending") {
   setProducts(prev => [...prev.sort((a, b) => a.price - b.price)]);
  };
  if (order === "Descending") {
   setProducts(prev => [...prev.sort((a, b) => b.price - a.price)]);
  };
 }, [order]);

 useEffect(() => {
  setProducts([...list].filter(product => product.rating >= rating));
 }, [rating, list]);

 useEffect(() => {
  document.title = `Products - ${type}`;
 }, [type]);

 return (
  <Main isDarkMode={isDarkMode}>
   <ProductBox>
	<div>
	{showFilter && (
	 <Filter
	  order={order}
	  rating={rating}
	  setOrder={setOrder}
	  setRating={setRating}
	  setShowFilter={setShowFilter}
     />
	)}
	 <div>
	  <Header>
	   <HeadTitle cl={isDarkMode ? "#fff" : "#111"}>{title}</HeadTitle>
		<IoIosFunnel
		 name='filter'
		 color={"#d5d5d5"}
		 size={24}
		 style={{cursor: "pointer"}}
		 onClick={() => setShowFilter(true)}
		/>
	  </Header>
	  <Products>
	  {products.map((item,index) => (
	   <Link
		key={`prod-${index}`}
		style={{textDecoration:"none"}}
		href={{pathname: "/home/singleproduct",query: {id: item.id}}}
	   >
		<Product bg={isDarkMode ? "#111" : "#fff"}>
		 <Image src={item.image} alt={item.title} />
		 <Info>
		  <Title cl={isDarkMode ? "#fff" : "#111"}>
		   {item.title}
		  </Title>
		  <Details>
		   <Description cl={isDarkMode ? "#f5f5f5" : "#444"}>
		    {item.description.slice(0, 60)}...
		   </Description>
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
	   </Link>
	  ))}
	  </Products>
	 </div>
	</div>
   </ProductBox>
  </Main>
 );
};

export default ProductsPage;

const Main = styled.div<{isDarkMode: boolean}>`
	display: flex;
	margin-top: ${({isDarkMode}) => (isDarkMode ? 0 : "20px")};
	padding-top: ${({isDarkMode}) => (!isDarkMode ? 0 : "20px")};
	background-color: ${({isDarkMode}) => isDarkMode ? "#181818" : "#fff"};
	justify-content: center;
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
	padding: 8px 10px;
`;

const HeadTitle = styled.h2<{cl: string}>`
	font-size: 22px;
	color: ${({cl}) => cl};
`;

const Products = styled.div`
	display: grid;
	padding: 10px;
	gap: 20px;
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;

export const Product = styled.div<{bg: string}>`
	display: flex;
	flex-direction: column;
	box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
	gap: 10px;
	border-radius: 5px;
	background-color: ${({bg}) => bg};

	&:hover {
	 box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
	}
`;

export const Image = styled.img`
 height: 220px;
 object-fit: cover;
 border-radius: 5px;
`;

export const Info = styled.div`
 display: flex;
 flex-direction: column;
 gap: 20px;
 padding: 12px;
`;

export const Title = styled.h3<{cl: string}>`
 color: ${({cl}) => cl};
 font-weight: 600;
 font-size: 18px;
 height: 40px;
`;

export const Details = styled.div`
 display: flex; 
 flex-direction: column; 
 gap: 10px;
`;

export const Description = styled.p<{cl: string}>`
 color: ${({cl}) => cl};
 font-size: 16px;
`;

export const IconHolder = styled.div`
 height: 36px;
 width: 36px;
 display: grid; 
 place-items: center;
`;

export const PriceHolder = styled.div`
 display: flex;
 align-items: center;
 gap: 4px;
`;

export const Price = styled.span<{cl: string}>`
 color: ${({cl}) => cl};
 font-weight: 600;
 font-size: 14px;
`;

export const RatingHolder = styled.div`
 display: flex;
 align-items: center;
 gap: 4px;
`;

export const Rating = styled.span<{cl: string}>`
 color: ${({cl}) => cl};
 font-size: 14px;
 font-weight: 600;
`;

export const TypeHolder = styled.div<{cl: boolean;}>`
 background-color: ${({cl}) => cl ? "#151515" : "#bebebe"};
 border-radius: 30px;
 padding: 8px 12px;
 display: grid;
 place-items: center;
 width: max-content;
`;

export const Type = styled.span`
 color: #fff;
 font-weight: 500;
 font-size: 12px;
`;