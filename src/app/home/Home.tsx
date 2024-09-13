"use client";

import styled from "styled-components";
import {useState,useEffect} from "react";
import List from "./List";
import {useAppDispatch, useAppSelector} from "@/lib/redux";
import type {product} from "@/utils/types";
import {API} from "@/lib/API";
import {addProducts} from "@/redux/productSlice";

const Home = () => {
 const [randomProducts,setRandomProducts] = useState<product[]>([]);
 const [watches,setWatches] = useState<product[]>([]);
 const [mobiles,setMobiles] = useState<product[]>([]);
 const [clothes,setClothes] = useState<product[]>([]);

 const dispatch = useAppDispatch();

 const {products} = useAppSelector((state) => state.product);
 const {isDarkMode} = useAppSelector(state => state.user);

 useEffect(() => {
  async function getProducts() {
   const res = await API.get("/product/fetchproducts");
   const data = await res.data;
   dispatch(addProducts(data));
  };
  
  getProducts();
 },[]);

 useEffect(() => {
  setRandomProducts([...products].sort(() => Math.random() - 0.5).slice(0,4));
 },[products]);

 useEffect(() => {
  const list = [...products];

  const pro = (type: "watch" | "clothes" | "mobile") => {
   return list.filter((item) => item.type === type).sort(() => Math.random() - 0.5).slice(0,4);
  };

  const watches = pro("watch");
  const clothes = pro("clothes");
  const mobilesData = pro("mobile");

  if(mobiles.length < 1) {
   setWatches(watches);
   setClothes(clothes);
   setMobiles(mobilesData);
  };
 },[products]);

 return (
  <Main isDarkMode={isDarkMode}>
   <ProductBox>
    <List title='Recommended For you' products={[...randomProducts]} />
    <List title='Brand New Watches' products={watches} />
    <List title='Clothes For you' products={clothes} />
    <List title='Mobiles & Accessories' products={mobiles} />
   </ProductBox>
  </Main>
 );
};

export default Home;

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
