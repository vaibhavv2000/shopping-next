import {useAppSelector} from "@/lib/redux";
import {Dispatch,SetStateAction,useState} from "react";
import {HiXMark} from "react-icons/hi2";
import styled from "styled-components";

interface props {
 rating: number;
 order: string;
 setRating: Dispatch<SetStateAction<number>>;
 setOrder: Dispatch<SetStateAction<string>>;
 setShowFilter: Dispatch<SetStateAction<boolean>>;
};

const Filter = (props: props): JSX.Element => {
 const [asc,setAsc] = useState<string>();
 const [star,setStar] = useState<number>();

 const {order,rating,setOrder,setRating,setShowFilter} = props;
 const {isDarkMode} = useAppSelector(state => state.user);

 return (
  <BoxHolder onClick={() => setShowFilter(false)}>
   <Box isDarkMode={isDarkMode} onClick={e => e.stopPropagation()}>
    <div>
	 <Top>
  	  <TopTitle isDarkMode={isDarkMode}>Filters</TopTitle>
	  <HiXMark
       name='x'
	   cursor={"pointer"}
	   size={28}
	   color={isDarkMode ? "#FFF" : "#666"}
	   onClick={() => setShowFilter(false)}
	  />
	 </Top>
	 <div style={{margin: "14px 0px"}}>
	  <Title isDarkMode={isDarkMode}>Ratings</Title>
	  <div style={{marginTop: "5px"}}>
	   {[4.5,4.0,3.0,2.0,1.0].map((o,index) => (
	    <Holder key={`ratings-${index}`} isDarkMode={isDarkMode}>
		 <Input
		  type='radio'
		  name='rating'
		  value={o}
		  checked={star === o}
		  style={{cursor: "pointer"}}
		  onChange={(e) => {
		   setRating(o);
		   setStar(Number(e.target.value));
		  }}
		 />
		 <p className='text-black/60 font-inter/500'>{o} & above</p>
	    </Holder>
	   ))}
	  </div>
	 </div>
	 <div className='mt-6 space-y-1'>
  	  <Title isDarkMode={isDarkMode}>Price</Title>
	  <div>
	  {["Ascending","Descending"].map((order) => (
	   <Holder isDarkMode={isDarkMode} key={`acs-${order}`}>
	    <Input
	     type='radio'
	     name='asc'
	     value={order}
	     checked={asc === order}
	     style={{cursor: "pointer"}}
	     onChange={(e) => {
	      setOrder(order);
	      setAsc(e.target.value);
	     }}
	    />
	    <p className='text-black/60 text-sm font-inter/500'>{order}</p>
	   </Holder>
	  ))}
      </div>
     </div>
    </div>
   </Box>
  </BoxHolder>
 );
};

export default Filter;

const BoxHolder = styled.div`
 display: grid;
 place-items: center;
 height: 100vh;
 width: 100vw;
 background-color: rgba(0,0,0,0.5);
 position: fixed;
 top: 0;
 left: 0;
`;

const Box = styled.div<{isDarkMode: boolean}>`
 max-width: 340px;
 width: 90%;
 padding: 20px;
 border-radius: 8px;
 background-color: ${({isDarkMode}) => isDarkMode ? "#181818" : "#fff"};
`;

const Top = styled.div`
 display: flex;
 align-items: center;
 justify-content: space-between;
`;

const TopTitle = styled.span<{isDarkMode: boolean}>`
 color: ${({isDarkMode}) => !isDarkMode ? "#111" : "#fff"};
 font-size: 28px;
 font-weight: 600;
`;

const Title = styled.span<{isDarkMode: boolean}>`
 color: ${({isDarkMode}) => !isDarkMode ? "#111" : "#f5f5f5"};
 font-size: 14px;
 display: block;
 margin-bottom: 12px;
 font-weight: 400;
`;

const Holder = styled.div<{isDarkMode: boolean}>`
 display: flex;
 align-items: center;
 gap: 10px;
 color: ${({isDarkMode}) => !isDarkMode ? "#111" : "#fff"};
 margin-bottom: 12px;
`

const Input = styled.input`
 transform: scale(1.3);
`;