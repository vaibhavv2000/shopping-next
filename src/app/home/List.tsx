import {useAppSelector} from "@/lib/redux";
import type {product} from "@/utils/types";
import Link from "next/link";
import {memo} from "react";
import styled from "styled-components";

interface props {
  title: string;
  bg?: string;
  products: product[];
};

const List = (props: props) => {
 const {title, bg = "#fff", products} = props;
 const {isDarkMode} = useAppSelector(state => state.user);

 return (
  <ListHolder bg={isDarkMode ? "#181818" : bg}>
   <ListTitle cl={isDarkMode ? "#ececec" : "#454040"}>{title}</ListTitle>
	 <Items>
 	  {products.map((product, index) => (
	  <Link
	   key={`product-list-${index}`}
	   href={{pathname: "/home/products",query: {type: product.type}}}
	   style={{height: "240px", width: "100%"}}>
	   <Item src={product.image} />
	  </Link>
	 ))}
	 </Items>
  </ListHolder>
 );
};

export default memo(List);

const ListHolder = styled.div<{bg: string}>`
  background-color: ${({bg}) => bg};
  padding: 6px;
  margin-bottom: 10px;
`;

const ListTitle = styled.h1<{cl: string}>`
  font-size: 26px;
  margin: 0 0 16px 0;
  font-weight: 600;
  color: ${({cl}) => cl};
`;

const Items = styled.div`
  display: grid;
  gap: 10px;
  justify-items: center;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
`;

const Item = styled.img`
  object-fit: cover;
  height: 100%;
  border: 10px;
  border-radius: 2px;
  width: 100%;

  &:hover {
	 box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }
`;
