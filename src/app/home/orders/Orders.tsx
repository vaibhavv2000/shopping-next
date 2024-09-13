"use client";

import {API} from "@/lib/API";
import {useState, useEffect} from "react";
import {ImPriceTag} from "react-icons/im";
import {IoMdStar} from "react-icons/io";
import {GoPlus} from "react-icons/go";
import {HiMinus} from "react-icons/hi2";
import styled from "styled-components";
import NotAuth from "@/components/NotAuth";
import {useAppDispatch, useAppSelector} from "@/lib/redux";
import {addToHistory, changeQuantity, emptyBag, removeFromBag} from "@/redux/productSlice";
import {Description, Details, IconHolder, Image, Info, Price, PriceHolder, Product, Rating, RatingHolder, Title, Type, TypeHolder} from "../products/Products";

const Orders = () => {
 const [totalPrice, setTotalPrice] = useState<number>(0);
 const {myOrders} = useAppSelector(state => state.product);
 const {user, isDarkMode} = useAppSelector(state => state.user);

 const dispatch = useAppDispatch();

 const removeFromOrder = async (id: number) => {
  dispatch(removeFromBag((id)));
  await API.delete(`/product/removefromorder?id=${id}&del=true`);
 };

 useEffect(() => {
  let total = 0;

  for(let order of myOrders) {
   total += order.quantity * order.price;
  };

  setTotalPrice(total);
 }, [myOrders]);

 const changeProductQuantity = async (id: number, opt: "incr" | "decr",) => {
  const data = {opt, id};
  dispatch(changeQuantity(data));

  try {
   if(opt === "incr") {
    await API.post("/product/addorder",{
	 productId: id,
	 incr: true
	});
   };
	 
   if(opt === "decr") {
    await API.post("/product/addorder",{
	 productId: id,
	 decr: true
    });
   };
  } catch (error) {
   console.log(error);
  };
 };

 const checkout = async () => {
  try {
   await API.post("/product/confirmorder", {userId: user.id});
   dispatch(addToHistory(myOrders));
   dispatch(emptyBag());
   setTotalPrice(0);
  } catch (error) {
   console.log(error);
  };
 };

 if (!user) return <NotAuth />;

 if (myOrders.length < 1) return <NotAuth title='Empty Bag' />;

 return (
  <Main isDarkMode={isDarkMode}>
   <ProductBox>
	<Top>
	 <Header>
	  <HeadTitle cl={isDarkMode ? "#fff" : "#111"}>Your Orders</HeadTitle>
	 </Header>
	 <OrderDetails>
	  <Checkout>
	   <TotalPriceHolder>
	    <PriceTitle cl={isDarkMode ? "#fff" : "#111"}>Total Price</PriceTitle>
	    <TotalPrice cl={isDarkMode ? "#fff" : "#111"}>{totalPrice}</TotalPrice>
	   </TotalPriceHolder>
	   <CheckoutBtn bg={isDarkMode ? "#222" : "#111"} onClick={checkout}>
		Checkout
	   </CheckoutBtn>
	  </Checkout>
	 </OrderDetails>	
	</Top>
	<Products>
	{myOrders.map((item, index) => (
	 <Product key={`order-m-${index}`} bg={isDarkMode ? "#111" : "#fff"}>
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
	    <QuantityHolder>
         <QuantityOpt 
          bg={isDarkMode ? "dodgerblue" : "#1E90FF"} 
          onClick={() => changeProductQuantity(item.id, "decr")}
         >
          <HiMinus size={20} color='#fff' />
         </QuantityOpt>
         <Quantity cl={isDarkMode ? "#fff" : "#111"}>
          {item.quantity}
         </Quantity>
         <QuantityOpt 
          bg={isDarkMode ? "dodgerblue" : "#1E90FF"} 
          onClick={() => changeProductQuantity(item.id, "incr",)}
         >
          <GoPlus size={20} color='#fff' />
         </QuantityOpt>
        </QuantityHolder>
       <RemoveProduct>
        <RemoveBtn
         bg={isDarkMode ? "#181818" : "dodgerblue"}
         onClick={() => removeFromOrder(item.id)}
        >
         Remove From cart
        </RemoveBtn>
       </RemoveProduct>
	  </Details>
	  <div style={{flex: 1, display: "flex", alignItems: "flex-end",}}>
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

export default Orders;

const Main = styled.div<{isDarkMode: boolean}>`
	display: flex;
	justify-content: center;
	margin-top: ${({isDarkMode}) => (isDarkMode ? 0 : "20px")};
	padding-top: ${({isDarkMode}) => (!isDarkMode ? 0 : "20px")};
	min-height: calc(100vh - 60px);
	background-color: ${({isDarkMode}) => (isDarkMode ? "#181818" : "#fff")};
`;

const ProductBox = styled.div`
	max-width: 1140px;
	position: relative;
	padding-bottom: 70px;
	width: 100%;
	height: max-content;
`;

const Top = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding-right: 12px;
   flex-wrap: wrap;
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
	gap: 15px;
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;

const RemoveProduct = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const RemoveBtn = styled.button<{bg: string}>`
	background-color: ${({bg}) => bg};
	color: #fff;
	padding: 12px 22px;
	border: none;
	outline: none;
	border-radius: 2px;
	font-weight: 500;
	box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
	cursor: pointer;
`;

const QuantityHolder = styled.div`
	display: flex;
	gap: 10px;
	margin: 5px 0;
	align-items: center;
`;

const Quantity = styled.span<{cl: string}>`
	font-weight: 500;
	font-size: 16px;
	color: ${({cl}) => cl};
`;

const QuantityOpt = styled.div<{bg: string}>`
	background-color: ${({bg}) => bg};
	display: grid;
	place-items: center;
	height: 30px;
	width: 30px;
	cursor: pointer;
`;

const OrderDetails = styled.div`
`;

const Checkout = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 15px;
`;

const TotalPriceHolder = styled.div`
   display: flex;
   justify-content: space-between;
   flex-direction: column;
   align-items: flex-end;
   gap: 5px;
`;

const PriceTitle = styled.span<{cl: string}>`
  	color: ${({cl}) => cl};
	font-size: 14px;
	font-weight: 500;
`;

const TotalPrice = styled.h2<{cl: string}>`
	color: ${({cl}) => cl};
	font-size: 24px;
	font-weight: 500;
`;

const CheckoutBtn = styled.button<{bg: string}>`
	background-color: ${({bg}) => bg};
	color: #fff;
	padding: 13px 25px;
	font-weight: 500;
	border: none;
	outline: none;
	font-size: 14px;
	cursor: pointer;
	width: 180px;
	flex: 1;
	border-radius: 5px;
`;