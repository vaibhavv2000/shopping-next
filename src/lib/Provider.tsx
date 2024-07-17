'use client';

import {AppStore,makeStore} from '@/redux/store';
import {ReactNode,useEffect,useRef} from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {useAppDispatch, useAppSelector} from './redux';
import {login, toggleDarkMode} from '@/redux/slices/authSlice';
import {API} from './API';
import {addDetails, setDataFetched} from '@/redux/slices/userSlice';

interface props {
 children: ReactNode;
};

function Provider({children}:props) {
 const storeRef = useRef<AppStore>()
 if(!storeRef.current) storeRef.current = makeStore();
 
 return (
  <ReduxProvider store={storeRef.current}>
   <Children>
    {children}
   </Children>
  </ReduxProvider>
 );
};

const Children = ({children}:props) => {
 const dispatch = useAppDispatch();
 const {isDataFetched} = useAppSelector(state => state.user);
 const {isAuth, user} = useAppSelector(state => state.auth);

 useEffect(() => {
  const user = localStorage.getItem("shopping-user");
  const darkmode = localStorage.getItem("shopping-darkmode");

  if(user) dispatch(login(JSON.parse(user)));
  if(darkmode) dispatch(toggleDarkMode("yes"));
 }, []);

 useEffect(() => {
  async function fetchUserData() {
   const res = await API.get(`/product/getuserdata?id=${user.id}`);
   const data = await res.data;

   const order_history = data.historylist;
   const wishlist = data.wishlist;
   const my_orders = data.orderlist;
  
   dispatch(addDetails({order_history, wishlist, my_orders}));
  };
  
  if (isAuth && !isDataFetched) {
   fetchUserData();
   dispatch(setDataFetched());
  };
 }, [isAuth]);

 return <>{children}</>;
};

export default Provider;