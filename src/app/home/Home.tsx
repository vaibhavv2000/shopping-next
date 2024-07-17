"use client";

import styled from "styled-components";
import {useState,useEffect} from "react";
import {addProducts,product} from "@/redux/slices/productSlice";
import List from "./List";
import {API} from "@/lib/API";
import {useAppDispatch, useAppSelector} from "@/lib/redux";

const Home = (): JSX.Element => {
 const [randomProducts,setRandomProducts] = useState<product[]>([]);
 const [watches,setWatches] = useState<product[]>([]);
 const [mobiles,setMobiles] = useState<product[]>([]);
 const [clothes,setClothes] = useState<product[]>([]);

 const {products} = useAppSelector((state) => state.product);
 const auth = useAppSelector(state => state.auth);
 const {isDarkMode} = auth;

 const dispatch = useAppDispatch();

 useEffect(() => {
  document.title = `Home`;
 },[]);

 useEffect(() => {
  const list = [...products];
  const random = list.sort((a,b) => Math.random() - 0.5).slice(0,4);
  setRandomProducts(random);
 },[products]);

 useEffect(() => {
  const list = [...products];

  const pro = (type: "watch" | "clothes" | "mobile") => {
   return list
   .filter((m) => m.type === type).sort((a,b) => Math.random() - 0.5).slice(0,4);
  };

  const watches = pro("watch");
  const clothes = pro("clothes");
  const mobiles_data = pro("mobile");

  if(mobiles.length < 1) {
   setWatches(watches);
   setClothes(clothes);
   setMobiles(mobiles_data);
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
  max-width: 800px;
  height: 50px;
  width: 100%;
  height: max-content;
`;
