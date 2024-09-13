"use client";

import {API} from "@/lib/API";
import styled from "styled-components";
import {AiFillHeart} from "react-icons/ai";
import {IoMdStar} from "react-icons/io";
import {ImPriceTag} from "react-icons/im";
import Link from "next/link";
import NotAuth from "@/components/NotAuth";
import {useAppDispatch, useAppSelector} from "@/lib/redux";
import {removeFromWishlist} from "@/redux/productSlice";
import {Description, Details, IconHolder, Image, Info, Price, PriceHolder, Product, Rating, RatingHolder, Title, Type, TypeHolder} from "../products/Products";
import {useRouter} from "next/navigation";

const Wishlist = () => {
 const {wishlist} = useAppSelector(state => state.product);
 const {user, isDarkMode} = useAppSelector(state => state.user);

 const {push} = useRouter();
 const dispatch = useAppDispatch();

 if (!user) return <NotAuth />;

 if (wishlist.length < 1) return <NotAuth title='Wishlist Empty' />;

 const removeFromWish = async (id: number) => {
  dispatch(removeFromWishlist((id)));
  await API.put(`/product/updatewishlist?id=${id}`);
 };

 return (
  <Main bg={isDarkMode ? "#181818" : "#fff"}>
   <ProductBox>
	<Header>
	 <HeadTitle cl={isDarkMode ? "#fff" : "#111"}>Wishlist</HeadTitle>
	</Header>
	<Products>
	{wishlist.map((item, index) => (
     <Product 
	  key={`wish-${item.id}-${index}`} 
	  bg={isDarkMode ? "#111" : "#fff"} 
	  style={{position: "relative"}}
	  onClick={() => push(`/singleproduct?id=${item.id}`)}
	 >
	  <AiFillHeart
	   size={28}
	   color='red'
	   onClick={() => removeFromWish(item?.id)}
	   cursor={"pointer"}
	   style={{position: "absolute", top: "10px", right: "10px"}}
	   />
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
	 ))}
	</Products>
   </ProductBox>
  </Main>
 );
};

export default Wishlist;

const Main = styled.div<{bg: string}>`
 display: flex;
 justify-content: center;
 flex: 1;
 background-color: ${({bg}) => bg};
`;

const ProductBox = styled.div`
 max-width: 1140px;
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
 gap: 16px;
 grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;