"use client";

import styled from "styled-components";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import images from "./images";

const Intro = () => {
 const [currentSlide, setCurrentSlide] = useState<number>(0);
 const [direction, setDirection] = useState<"left" | "right">("right");

 const {push} = useRouter();

 useEffect(() => {
  const timer = setInterval(() => {
   if(direction === "right") setCurrentSlide(currentSlide + 1);
   else setCurrentSlide(currentSlide - 1);
  }, 4000);

  if (currentSlide > 1) setDirection("left");
  if (currentSlide < 1) setDirection("right");

  return () => clearInterval(timer);
 }, [currentSlide, direction]);

 return (
  <Main>
   <Left>
	<Slider y={-currentSlide * 33.33}>
	{images.map((item, index) => (
	 <Image src={item} alt={'Shopping-Image'} key={String(`Img-${index}`)} />
	))}
	</Slider>
   </Left>
   <Right>
	<div>
	 <Title>Your One Stop Shopping Center</Title>
	 <Button show={true} onClick={() => push("/home")}>Explore Now</Button>
	</div>
   </Right>
   <Button show={false} onClick={() => push("/home")}>Explore Now</Button>
  </Main>
 );
};

export default Intro;

const Main = styled.main`
 height: 100vh;
 width: 100vw;
 display: flex;
`;

const Left = styled.div`
 flex: 1;
 height: 100%;
 overflow: hidden;
`;

const Slider = styled.div<{y: number}>`
 height: max-content;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition: all 1s ease-in-out;
 transform: ${({y}) =>`translateY(${y}%)`};
`;

const Image = styled.img`
 height: 100vh;
 object-fit: cover;
 width: 100%;
`;

const Right = styled.div`
 flex: 1;
 background-color: #111;
 display: flex;
 flex-direction: column;
 gap: 20px;
 align-items: center;
 justify-content: center;

 @media screen and (max-width: 960px) {
  display: none;
 }
`;

const Title = styled.p`
 color: #fff;
 text-align: center;
 margin-bottom: 20px;
 font-size: 57px;
 font-family: "Castoro Titling", cursive;

 @media screen and (max-width: 680px) {
  font-size: 30px;
 }

 @media screen and (min-width: 950px) and (max-width: 1070px) {
  font-size: 40px;
 }
`;

const Button = styled.button<{show?: boolean}>`
 background-color: dodgerblue;
 border: none;
 padding: 12px 24px;
 outline: none;
 box-shadow: 4px 4px 0 #111;
 display: block;
 margin: auto;
 transition: all 2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
 cursor: pointer;
 font-size: 16px;
 font-weight: 500;
 color: #fff;
 letter-spacing: 1px;

 :hover {
  color: #111;
  background-color: #fff;
 }

 @media screen and (max-width: 960px) {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
 }

 @media screen and (min-width: 960px) {
  display: ${({show}) => show ? "block" : "none"};
 }
`;