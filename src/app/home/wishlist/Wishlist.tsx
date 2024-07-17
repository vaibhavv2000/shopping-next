"use client";

import {API} from "@/lib/API";
import {removeFromWishlist} from "@/redux/slices/userSlice";
import styled from "styled-components";
import {AiFillHeart} from "react-icons/ai";
import {IoMdStar} from "react-icons/io";
import {ImPriceTag} from "react-icons/im";
import Link from "next/link";
import NotAuth from "@/components/NotAuth";
import {useAppDispatch, useAppSelector} from "@/lib/redux";

const Wishlist = (): JSX.Element => {
 const {wishlist} = useAppSelector(state => state.user);
 const {isAuth, user, isDarkMode} = useAppSelector(state => state.auth);

 const dispatch = useAppDispatch();

 if (!isAuth) return <NotAuth />;

 if (wishlist.length < 1) return <NotAuth title='Wishlist Empty' />;

 const removeFromWish = async (id: number) => {
  dispatch(removeFromWishlist((id)));
  await API.post("/product/removefromwishlist", {
   userId: user.id,
   productId: id,
  });
 };

 return (
  <Main bg={isDarkMode ? "#181818" : "#fff"}>
   <ProductBox>
	<Header>
	 <HeadTitle cl={isDarkMode ? "#fff" : "#111"}>Wishlist</HeadTitle>
	</Header>
	<Products>
	 {wishlist.map((p,index) => (
     <Product bg={isDarkMode ? "#111" : "#fff"} key={`wish_${index}`}>
	  <Top>
	   <AiFillHeart
		size={28}
		color='red'
		onClick={() => removeFromWish(p.id)}
		cursor={"pointer"}
		style={{position: "absolute", top: "10px", right: "10px"}}
	   />
	   <Image src={p.image} alt={p.product_name} />
	  </Top>
	  <Info>
	   <Link href={{pathname: "/home/singleproduct", query: {id: p.id}}}>
	    <Title cl={isDarkMode ? "#fff" : "#111"}>
	     {p.product_name}
	    </Title>
	   </Link>
	   <PriceHolder>
	    <ImPriceTag size={18} color={isDarkMode ? "#fff" : "#111"} />
	    <Price cl={isDarkMode ? "#fff" : "#555"}>{p.price}</Price>
	   </PriceHolder>
	   <RatingHolder>
	    <IoMdStar size={26} color={isDarkMode ? "#fff" : "#111"} />
	    <Rating cl={isDarkMode ? "#fff" : "#222"}>{p.rating}</Rating>
	   </RatingHolder>
	   <Description cl={isDarkMode ? "#999" : "#444"}>
	    {p.description.slice(0, 100)}...
	   </Description>
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
 min-height: calc(100vh - 60px);
 background-color: ${({bg}) => bg};
`;

const ProductBox = styled.div`
 max-width: 800px;
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
 color: ${({cl}) => cl};
`;

const Products = styled.div`
 display: grid;
 padding: 10px;
 gap: 16px;
 grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const Product = styled.div<{bg: string}>`
 display: flex;
 flex-direction: column;
 gap: 10px;
 background-color: ${({bg}) => bg};
`;

const Top = styled.div`
 position: relative;
`;

const Image = styled.img`
 height: 250px;
 object-fit: cover;
 border-radius: 5px;
 width: 100%;
`;

const Info = styled.div`
 display: flex;
 flex-direction: column;
 gap: 8px;
 padding: 5px;
`;

const Title = styled.h4<{cl: string}>`
 color: ${({cl}) => cl};
 cursor: pointer;
`;

const Description = styled.p<{cl: string}>`
 color: ${({cl}) => cl};
 font-size: 16px;
`;

const PriceHolder = styled.div`
 display: flex;
 align-items: center;
 gap: 5px;
`;

const Price = styled.span<{cl: string}>`
 color: ${({cl}) => cl};
 font-weight: 600;
`;

const RatingHolder = styled.div`
 display: flex;
 align-items: center;
 gap: 5px;
`;

const Rating = styled.span<{cl: string}>`
 color: ${({cl}) => cl};
`;