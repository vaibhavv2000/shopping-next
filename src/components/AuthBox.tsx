"use client";

import {useState, type ChangeEvent, FormEvent, useEffect} from "react";
import styled from "styled-components";
import {sm} from "@/lib/responsive";
import {API} from "@/lib/API";
import {HiXMark} from "react-icons/hi2";
import {useAppDispatch, useAppSelector} from "@/lib/redux";
import Loader from "./Loader";
import {login as loginUser} from "../redux/userSlice";
import {validateEmail} from "@/lib/emailValidator";
import {toggleAuthModal} from "@/redux/userSlice";

const AuthBox = () => {
 const [authOption, setAuthOption] = useState<"login" | "register">("login");
 const [register, setRegister] = useState({
  name: "",
  email: "",
  password: "",
 });
 const [login, setLogin] = useState({
  email: "",
  password: "",
 });
 const [loginError, setLoginError] = useState("");
 const [registerError, setRegisterError] = useState("");
 const [loading, setLoading] = useState(false);

 const {isDarkMode} = useAppSelector(state => state.user);
 const dispatch = useAppDispatch();

 useEffect(() => {
  if (loginError) setTimeout(() => setLoginError(""), 5000);
  if (registerError) setTimeout(() => setRegisterError(""), 5000);
 }, [loginError, registerError]);

 const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if(loading) return;

  try {
   if (authOption === "register") {
	let {email, name, password} = register;
	name = name.trim();
	email = email.trim();
	password = password.trim();

	if(!name || !email || !password) return setRegisterError("All fields are necessary");
	if(name.length < 3) return setRegisterError("Name should have atleast 3 characters");
	if(!validateEmail(email)) return setRegisterError("Invalid Email");
	if(password.length < 8) return setRegisterError("Password must  be atleast 8 characters");
	if(password.includes(" ")) return setRegisterError("Password should not include spaces");

	const res = await API.post(`/auth/register`, register);
	localStorage.setItem("shopping-auth", "true");

	setRegister({email: "", password: "", name: ""});

	dispatch(loginUser(res.data.user));
	dispatch(toggleAuthModal());
   };

   if(authOption === "login") {
	let {email, password} = login;

	if(!email || !password) return setLoginError("All fields are necessary");
	if(!validateEmail(email)) return setLoginError("Invalid Email");
	if(password.length < 8) return setLoginError("Password must  be atleast 8 characters");
	if(password.includes(" ")) return setLoginError("Password should not include spaces");

	const res = await API.post(`/auth/login`, login);
	localStorage.setItem("shopping-user", "auth");

	setLogin({email: "", password: ""});

	dispatch(loginUser(res.data.user));
	dispatch(toggleAuthModal());
   };
  } catch (error: any) {
   if (authOption === "register") setRegisterError(error?.response?.data?.message);
   else setLoginError(error.response.data.message);
  } finally {
   setLoading(false);
  };
 };

 return (
  <Main>
   <Box bg={isDarkMode ? "black" : "#fff"}>
	<div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
	 <HeaderTitle cl={isDarkMode ? "#fff" : "#111"}>Auth</HeaderTitle>
	  <HiXMark
	   size={28}
	   color={isDarkMode ? "#fff" : "#666"}
	   style={{cursor: "pointer"}}
	   onClick={() => dispatch(toggleAuthModal())}
	  />
	</div>
	<AuthOptions dm={isDarkMode}>
	 <AuthTitle
	   cl={isDarkMode ? "#fff" : "#111"}
	   onClick={() => setAuthOption("register")}>
	   Register
	 </AuthTitle>
	 <AuthTitle
	   cl={isDarkMode ? "#fff" : "#111"}
	   onClick={() => setAuthOption("login")}>
	   Login
	 </AuthTitle>
	 <AuthSlider dm={isDarkMode} opt={authOption}></AuthSlider>
	</AuthOptions>
	<div style={{width: "300px", overflowX: "hidden"}}>
	 <AuthOpt opt={authOption}>
	  <Register onSubmit={handleSubmit}>
	   <Input
		placeholder='Name'
		name='name'
		dm={isDarkMode}
		onChange={(e) => setRegister((p) => ({...p, [e.target.name]: e.target.value}))}
	   />
	   <Input
		dm={isDarkMode}
		placeholder='Email'
		name='email'
		onChange={e => setRegister((p) => ({...p,[e.target.name]: e.target.value,}))}
	   />
	   <Input
		placeholder='Password'
		type='password'
		dm={isDarkMode}
		name='password'
		onChange={e => setRegister((p) => ({...p,[e.target.name]: e.target.value,}))}
	   />
	   {registerError && <ErrorShow>{registerError}</ErrorShow>}
	  <Button bg={isDarkMode}>
	   Register
	   {loading && <span className="scale-25"><Loader color="#fff" size={16} /></span>}
	  </Button>
	  </Register>
	  <Login onSubmit={handleSubmit}>
	   <Input
		placeholder='Email'
		name='email'
		dm={isDarkMode}
		onChange={({target}) => setLogin((prev) => ({...prev, [target.name]: target.value,}))}
	   />
	   <Input
		dm={isDarkMode}
		placeholder='Password'
		type='password'
		name='password'
		onChange={({target}) => setLogin((prev) => ({...prev, [target.name]: target.value,}))}
	   />
	  {loginError && <ErrorShow>{loginError}</ErrorShow>}
	  <Button bg={isDarkMode}>
	   Login
	   {loading && <span className="scale-25"><Loader color="#fff" size={16} /></span>}
	  </Button>
	  </Login>
	 </AuthOpt>
	</div>
   </Box>
  </Main>
 );
};

export default AuthBox;

const Main = styled.div`
 height: 100vh;
 width: 100vw;
 top: 0;
 left: 0;
 position: fixed;
 z-index: 1000000;
 background-color: rgba(0, 0, 0, 0.5);
 display: grid;
 place-items: center;
`;

const Box = styled.div<{bg: string}>`
 background-color: ${({bg}) => bg};
 border-radius: 8px;
 padding: 20px;
 max-width: 340px;
`;

const HeaderTitle = styled.h1<{cl: string}>`
 font-size: 26px;
 font-weight: 600;
 color: ${({cl}) => cl};
 text-align: center;
`;

const AuthOptions = styled.div<{dm: boolean}>`
 display: flex;
 cursor: pointer;
 padding: 8px 0;
 margin: 5px 0;
 position: relative;
`;

const AuthSlider = styled.div<{opt: string; dm: boolean}>`
 position: absolute;
 width: 50%;
 background-color: ${({dm}) => (dm ? "#fff" : "dodgerblue")};
 height: 3px;
 bottom: 0;
 left: ${({opt}) => (opt === "register" ? 0 : "50%")};
 transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

const AuthTitle = styled.p<{cl: string}>`
 flex: 1;
 padding: 10px;
 color: ${({cl}) => cl};
 font-weight: 500;
 text-align: center;

 :hover {
  background-color: rgba(0, 0, 0, 0.0044444);
 }
`;

const AuthOpt = styled.div<{opt: string}>`
 width: max-content;
 transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
 display: flex;
 transform: ${({opt}) => opt === "register" ? "translateX(0)" : "translateX(-300px)"};
 margin-top: 20px;
`;

const Register = styled.form`
 width: 300px;
 display: flex;
 flex-direction: column;
 gap: 15px;
 ${sm({width: "300px"})}
`;

const Login = styled.form`
 width: 300px;
 display: flex;
 flex-direction: column;
 gap: 15px;
`;

const Input = styled.input<{dm: boolean}>`
 border: none;
 padding: 16px;
 border-radius: 3px;
 font-size: 14px;
 outline: none;
 background-color: ${({dm}) => (dm ? "#181818" : "#f5f5f5")};
 color: ${({dm}) => (dm ? "#fff" : "#111")};
`;

const ErrorShow = styled.p`
 color: red;
 font-size: 14px;
`;

const Button = styled.button<{bg: boolean}>`
 cursor: pointer;
 font-weight: 600;
 background-color: ${({bg}) => (bg ? "#0f0f0f" : "#1E90FF")};
 border: none;
 outline: none;
 display: flex;
 justify-content: center;
 align-items: center;
 gap: 8px;
 padding: 15px 22px;
 border-radius: 4px;
 font-size: 14px;
 color: #fff;
`;