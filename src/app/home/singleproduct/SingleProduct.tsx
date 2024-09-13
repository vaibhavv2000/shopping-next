"use client";

import styled from "styled-components";
import {useState, useEffect} from "react";
import {API} from "@/lib/API";
import {AiFillHeart, AiFillStar} from "react-icons/ai";
import {ImPriceTag} from "react-icons/im";
import {useAppDispatch, useAppSelector} from "@/lib/redux";
import type {product} from "@/utils/types";
import {toggleAuthModal} from "@/redux/userSlice";
import {addToBag, addToWishlist, removeFromBag, removeFromWishlist} from "@/redux/productSlice";
import {IoHeartOutline} from "react-icons/io5";

const SingleProduct = ({id}:{id:string}) => {
 const [product, setProduct] = useState<product>();
 const [isWished, setIsWished] = useState<boolean>(false);
 const [isInCart, setIsInCart] = useState<boolean>(false);

 const products = useAppSelector(state => state.product.products);
 const {wishlist, myOrders} = useAppSelector(state => state.product);
 const {user, isDarkMode} = useAppSelector(state => state.user);

 const dispatch = useAppDispatch();

 useEffect(() => {
  document.title = `${product?.title}`;
 }, [product]);

 useEffect(() => {
  setProduct(products.find(product => String(product.id) === String(id)));
 }, [products, id]);

 useEffect(() => {
  setIsWished(wishlist.some((prdouct) => String(prdouct.id) === String(id)));
 }, [wishlist, id]);

 useEffect(() => {
  setIsInCart(myOrders.some((product) => String(product.id) === String(id)));
 }, [myOrders, id]);

 const addToCart = async (option: boolean) => {
  if(!user.email) return dispatch(toggleAuthModal());
  setIsInCart(option);
  dispatch(option ? addToBag({...product, quantity: 1}) : removeFromBag(product?.id));

  if(option) await API.post(`/product/addorder`, {productId: id});
  else await API.delete(`/product/removefromorder?id=${id}&del=true`);
 };

 const updateWishlist = async (option: boolean) => {
  if(!user.email) return dispatch(toggleAuthModal());
  setIsWished(option);
  dispatch(option ? addToWishlist(product) : removeFromWishlist(product?.id));
  await API.put(`/product/updatewishlist?id=${product?.id}&${option && "add=true"}`);
 };

 return (
  <Main isDarkMode={isDarkMode}>
   <Product bg={isDarkMode ? "#111" : "#fff"}>
	<Image src={product?.image} alt={product?.title} />
    <div style={{
     display: "flex",
	 justifyContent: "space-between",
	 flexDirection: "column",
	 flex: 1,
	 padding: "10px",
	}}>
	 <Info>
	  <Header>
	   <Title cl={isDarkMode ? "#fff" : "#111"}>{product?.title}</Title>
	   {isWished ? (
	    <AiFillHeart
		 size={24}
		 color={"red"}
		 onClick={() => updateWishlist(false)}
		 cursor={"pointer"}
		/>
	   ) : (
		<IoHeartOutline
		 size={24}
		 color={"#777"}
		 onClick={() => updateWishlist(true)}
		 cursor={"pointer"}
		/>
	   )}
	  </Header>
	  <RatingHolder>
	   <AiFillStar color='#5bd450' size={22} />
		<Rating cl={isDarkMode ? "#fff" : "#111"}>{product?.rating}</Rating>
	  </RatingHolder>
	  <PriceHolder>
	   <ImPriceTag color='#62d645' size={18} />
	   <Price cl={isDarkMode ? "#fff" : "#111"}>{product?.price}</Price>
	  </PriceHolder>
	  <Description cl={isDarkMode ? "#fff" : "#555"}>
	   {product?.description}
	  </Description>
	 </Info>
	 <AddBtn
	  bg={isDarkMode ? "#181818" : "#111"}
	  onClick={() => addToCart(!isInCart)}
	 >
	  {isInCart ? "Remove From" : "Add To"} Bag
	 </AddBtn>
	</div>
   </Product>
  </Main>
 );
};

export default SingleProduct;

const Main = styled.div<{isDarkMode: boolean}>`
 display: grid;
 place-items: center;
 background-color: ${({isDarkMode}) => (isDarkMode ? "#181818" : "#fff")};
 height: 100%;

 @media screen and (min-width: 670px) {
  margin-top: ${({isDarkMode}) => (isDarkMode ? 0 : "20px")};
  padding-top: ${({isDarkMode}) => (!isDarkMode ? 0 : "20px")};
  height: calc(100vh - 60px);
  padding: 15px;
 }
`;

const Product = styled.div<{bg: string}>`
 display: flex;
 max-width: 740px;
 background-color: ${({bg}) => bg};
 gap: 5px;
 width: 100%;

 @media screen and (max-width: 670px) {
  flex-direction: column;
  width: 100%;
 }
`;

const Image = styled.img`
 width: 370px;
 border-radius: 4px solid red;
 object-fit: cover;

 @media screen and (max-width: 670px) {
  width: 100%;
 }
`;

const Info = styled.div`
 display: flex;
 width: 350px;
 flex-direction: column;
 padding: 5px;
 width: 100%;
 gap: 8px;
`;

const Header = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: flex-start;
 gap: 10px;
 padding: 5px 0;
`;

const Title = styled.h3<{cl: string}>`
 color: ${({cl}) => cl};
`;

const RatingHolder = styled.div`
 display: flex;
 align-items: center;
 gap: 8px;
`;

const Rating = styled.span<{cl: string}>`
 font-weight: 400;
 font-size: 14px;
 color: ${({cl}) => cl};
`;

const PriceHolder = styled.div`
 display: flex;
 align-items: center;
 gap: 12px;
`;

const Price = styled.span<{cl: string}>`
 font-weight: 400;
 font-size: 14px;
 color: ${({cl}) => cl};
`;

const Description = styled.p<{cl: string}>`
 color: ${({cl}) => cl};
`;

const AddBtn = styled.button<{bg: string}>`
 background-color: ${({bg}) => bg};
 border: none;
 outline: none;
 border-radius: 4px;
 color: #fff;
 padding: 14px 22px;
 cursor: pointer;
 margin: 20px;
 font-weight: 600;
`;