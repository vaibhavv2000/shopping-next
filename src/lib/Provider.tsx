'use client';

import {type ReactNode,useEffect,useRef} from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {useAppDispatch, useAppSelector} from './redux';
import {API} from './API';
import {AppStore, makeStore} from './store';
import {login, toggleDarkMode} from '@/redux/userSlice';
import {addDetails} from '@/redux/productSlice';

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
 const {user} = useAppSelector(state => state.user);

 useEffect(() => {
  const checkAuth = async () => {
   const darkmode = localStorage.getItem("shopping-darkmode");
   if(darkmode) dispatch(toggleDarkMode(true));

   const auth = localStorage.getItem("shopping-auth");
   if(!auth) return;

   try {
    const res = await API.get("/auth/checkauth");
    dispatch(login(res.data));
   } catch (error) {
    localStorage.removeItem("shopping-auth");
   } 
  };

  checkAuth();
 }, []);

 useEffect(() => {
  async function fetchUserData() {
   if(!user.email) return;

   try {
    const res = await API.get(`/product/getuserdata`);
    dispatch(addDetails(res.data));
   } catch (error) {
    console.log("ERORRR", error)
   }
  };
  
  fetchUserData();
 }, [user.email]);

 return <>{children}</>;
};

export default Provider;